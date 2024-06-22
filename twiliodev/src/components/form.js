import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, Select } from '@chakra-ui/react';

const ExerciseForm = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [phone, setPhone] = useState('');
  const [mealType, setMealType] = useState('none'); // Default to 'none'
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Sending request with exerciseType: ${exerciseType}, phone: ${phone}, mealType: ${mealType}`);
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_and_send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exerciseType,
          phone,
          mealType
        })
      });
      const data = await response.json();
      console.log('Response received:', data);
      setMessage(data.message || data.error);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to generate and send exercise instruction');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl id="exerciseType" isRequired>
          <FormLabel>Exercise Type</FormLabel>
          <Select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
            <option value="">Select an exercise</option>
            <option value="pushup">Push-up</option>
            <option value="pullup">Pull-up</option>
            <option value="squat">Squat</option>
            <option value="deadlift">Deadlift</option>
            <option value="benchpress">Bench Press</option>
            <option value="plank">Plank</option>
            <option value="yoga_sun_salutation">Yoga - Sun Salutation</option>
            <option value="yoga_tree_pose">Yoga - Tree Pose</option>
            <option value="yoga_downward_dog">Yoga - Downward Dog</option>
            <option value="yoga_warrior_pose">Yoga - Warrior Pose</option>
            <option value="yoga_bridge_pose">Yoga - Bridge Pose</option>
          </Select>
        </FormControl>
        <FormControl id="phone" isRequired mt={4}>
          <FormLabel>WhatsApp Phone Number</FormLabel>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+919876543210"
          />
        </FormControl>
        <FormControl id="mealType" mt={4}>
          <FormLabel>Meal Type</FormLabel>
          <Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="none">None</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="preworkout">Pre-Workout</option>
            <option value="postworkout">Post-Workout</option>
            <option value="dinner">Dinner</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>Get Exercise</Button>
      </form>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
};

export default ExerciseForm;
