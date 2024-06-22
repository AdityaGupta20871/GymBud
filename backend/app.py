from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import os
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from dotenv import load_dotenv
import logging
from datetime import datetime, timedelta
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Twilio credentials
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_WHATSAPP_FROM = 'whatsapp:+14155238886'  # Your Twilio WhatsApp number

# Cohere credentials
COHERE_API_KEY = os.getenv('COHERE_API_KEY')

# Initialize Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# File for storing historical metrics
HISTORICAL_METRICS_FILE = 'historical_metrics.json'
DAILY_QUOTE_FILE = 'daily_quote.json'

# Load historical metrics
if os.path.exists(HISTORICAL_METRICS_FILE):
    with open(HISTORICAL_METRICS_FILE, 'r') as file:
        historical_metrics = json.load(file)
else:
    historical_metrics = []

# Load daily quote
if os.path.exists(DAILY_QUOTE_FILE):
    with open(DAILY_QUOTE_FILE, 'r') as file:
        daily_quote_data = json.load(file)
else:
    daily_quote_data = {"quote": "", "date": ""}

latest_metric = {}

def generate_daily_quote():
    co = cohere.Client(COHERE_API_KEY)
    response = co.generate(
        model='command-xlarge-nightly',
        prompt="Generate a motivational quote for fitness enthusiasts.",
        max_tokens=50,
        temperature=0.7,
    )
    quote = response.generations[0].text.strip()
    app.logger.info(f'Generated quote: {quote}')
    return quote

def update_daily_quote():
    today_str = datetime.now().strftime("%Y-%m-%d")
    if daily_quote_data.get("date") != today_str:
        daily_quote_data["quote"] = generate_daily_quote()
        daily_quote_data["date"] = today_str
        with open(DAILY_QUOTE_FILE, 'w') as file:
            json.dump(daily_quote_data, file)

@app.route('/generate_and_send', methods=['POST'])
def generate_and_send():
    data = request.get_json()
    exercise_type = data.get('exerciseType')
    user_phone = data.get('phone')
    meal_type = data.get('mealType', 'none')  # Default to 'none' if not provided

    app.logger.debug(f'Received request: exerciseType={exercise_type}, phone={user_phone}, mealType={meal_type}')

    if not exercise_type or not user_phone:
        return jsonify({'error': 'Invalid data'}), 400

    try:
        # Generate exercise instruction using Cohere
        co = cohere.Client(COHERE_API_KEY)
        response = co.generate(
            model='command-xlarge-nightly',  # Using a more capable model for detailed responses
            prompt=f"Create a brief workout plan including {exercise_type} exercises. Include the number of sets and reps for each exercise. Also, suggest a simple {meal_type} meal with calorie details.",
            max_tokens=300,  # Increased token limit for a more detailed response
            temperature=0.7,  # Adjust temperature for more detailed and creative responses
        )
        generated_text = response.generations[0].text.strip()
        app.logger.info(f'Generated text: {generated_text}')

        # Send instruction via WhatsApp using Twilio
        message = client.messages.create(
            from_=TWILIO_WHATSAPP_FROM,
            body=generated_text,
            to=f'whatsapp:{user_phone}'
        )
        app.logger.info(f'Sent message to {user_phone}: {generated_text}')
        app.logger.info(f'Twilio message SID: {message.sid}')

        return jsonify({'message': 'Instruction sent!', 'instruction': generated_text})
    
    except Exception as e:
        app.logger.error(f'Error: {e}')
        return jsonify({'error': 'Failed to generate and send instruction'}), 500

@app.route('/incoming_message', methods=['POST'])
def incoming_message():
    """Handle incoming WhatsApp messages and update metrics"""
    global latest_metric
    incoming_msg = request.values.get('Body', '').lower()
    response = MessagingResponse()

    try:
        # Parse the incoming message to extract metrics
        sets, reps, time, calories = map(int, incoming_msg.split())
        latest_metric = {
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "sets": sets,
            "reps": reps,
            "time": time,
            "calories": calories
        }
        historical_metrics.append(latest_metric)

        # Save to file
        with open(HISTORICAL_METRICS_FILE, 'w') as file:
            json.dump(historical_metrics, file)

        response.message('Metrics updated successfully!')
        app.logger.info(f'Updated metrics: {latest_metric}')
    except ValueError:
        response.message('Invalid format. Send as: <sets> <reps> <time> <calories>')

    return str(response)

@app.route('/get_metrics', methods=['GET'])
def get_metrics():
    """Endpoint to get current metrics"""
    update_daily_quote()
    return jsonify({**latest_metric, "daily_quote": daily_quote_data["quote"]})

@app.route('/get_historical_metrics', methods=['GET'])
def get_historical_metrics():
    """Endpoint to get historical metrics"""
    return jsonify(historical_metrics)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
