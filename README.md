[Watch Video Demo](https://youtu.be/dm1YYX46k3Q)
## Prerequisites

Before you begin, ensure you have the following installed on your development environment:

- Python 3.x
- Node.js
- npm (Node Package Manager)

## Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd twilio/backend
    ```

2. **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment variables:**

    - Create a `.env` file in the `backend` directory with the following content:
      ```
      TWILIO_ACCOUNT_SID= Your SID
      TWILIO_AUTH_TOKEN=Your Auth Token
      COHERE_API_KEY=Your API KEY
      ```

5. **Run the backend server:**

    ```bash
    python app.py
    ```

    Your Flask server will start running on http://127.0.0.1:5000/.

6. **Optional: Running Flask with ngrok**

    - If you want to expose your local Flask server to the internet for testing:
      ```bash
      choco install ngrok(in Powershell if windows)
      ngrok config add-authtoken Your AuthToken
      ngrok http 5000
      ```
    - Follow the instructions in the `ngrok` terminal to get your public URL.

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../twiliodev
    ```

2. **Install the required npm packages:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    - Create a `.env` file in the `twiliodev` directory with the following content:
      ```
      REACT_APP_BACKEND_URL=http://127.0.0.1:5000/
      ```

4. **Run the frontend development server:**

    ```bash
    npm start
    ```

    Your React application will be available at http://localhost:3000/.

## Application Usage

- **Backend Endpoints:**
  - `/generate_and_send`: POST endpoint to generate and send exercise instructions via WhatsApp.
  - `/incoming_message`: POST endpoint to handle incoming WhatsApp messages and update metrics.
  - `/get_metrics`: GET endpoint to fetch current metrics including daily quote.
  - `/get_historical_metrics`: GET endpoint to fetch historical metrics.

- **Frontend Application:**
  - The React application (`twiliodev`) includes:
    - **App.js**: Main entry point rendering components and handling routing.
    - **Meters.js**: Displays performance metrics and historical data using Recharts.
    - **ExerciseForm.js**: Form component to interact with the backend for generating exercise instructions.
    - **Card.js**: Component for displaying styled cards with dynamic content.
    - **Navbar.js**, **Sidebar.js**: Navigation and sidebar components for UI navigation.

## Additional Notes

- Ensure both backend and frontend servers are running simultaneously during development.
- Adjust paths and configurations as per your project's specific requirements and environment.

![Screenshot (171)](https://github.com/AdityaGupta20871/GymBud/assets/103377205/04d6fca5-ac1d-44d2-bfda-34d2b0bca32d)
![Screenshot (170)](https://github.com/AdityaGupta20871/GymBud/assets/103377205/d8bdffed-0ebc-49b0-bff9-8da441000fb9)
