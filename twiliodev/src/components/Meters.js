import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Heading, Alert, AlertIcon, Divider, Select } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import CardComponent from './Card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import gym from '../assets/Gym.jpg' // Adjust the path according to your project structure

function Meters() {
  const [latestMetric, setLatestMetric] = useState({});
  const [historicalMetrics, setHistoricalMetrics] = useState([]);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [timeRange, setTimeRange] = useState('day');
  const [error, setError] = useState(null);
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const latestResponse = await axios.get('http://127.0.0.1:5000/get_metrics');
        setLatestMetric(latestResponse.data);
        setDailyQuote(latestResponse.data.daily_quote);

        const historicalResponse = await axios.get('http://127.0.0.1:5000/get_historical_metrics');
        setHistoricalMetrics(historicalResponse.data);
        setFilteredMetrics(historicalResponse.data); // Initialize with all data

        setError(null);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError('Error fetching metrics. Please try again later.');
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filterMetrics = () => {
      const now = dayjs();
      let filtered = historicalMetrics;

      if (timeRange === 'day') {
        filtered = historicalMetrics.filter(metric => dayjs(metric.date).isAfter(now.subtract(1, 'day')));
      } else if (timeRange === 'week') {
        filtered = historicalMetrics.filter(metric => dayjs(metric.date).isAfter(now.subtract(1, 'week')));
      } else if (timeRange === 'month') {
        filtered = historicalMetrics.filter(metric => dayjs(metric.date).isAfter(now.subtract(1, 'month')));
      }

      setFilteredMetrics(filtered);
    };

    filterMetrics();
  }, [timeRange, historicalMetrics]);

  const chartData = filteredMetrics.map(metric => ({
    date: metric.date,
    sets: metric.sets,
    reps: metric.reps,
    time: metric.time,
    calories: metric.calories,
  }));

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} color="purple.600">Performance Metrics</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr 1fr' }} gap={6} mb={6}>
        <GridItem colSpan={1}>
          <CardComponent 
            title="Today's Quote"
            data={dailyQuote}
            bgColor="blue.300"
            bgImage={gym}
          />
        </GridItem>
        <GridItem>
          <CardComponent 
            title="Exercises Performed"
            data={latestMetric.exercises || "No data"}
            bgColor="green.300"
          />
        </GridItem>
        <GridItem>
          <CardComponent 
            title="Meals Consumed"
            data={latestMetric.meals || "No data"}
            bgColor="yellow.300"
          />
        </GridItem>
      </Grid>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6} mb={6}>
        <GridItem>
          <CardComponent 
            title="Workout Time"
            data={latestMetric.time || "No data"}
            bgColor="orange.300"
          />
        </GridItem>
        <GridItem>
          <CardComponent 
            title="Calories Burned"
            data={latestMetric.calories || "No data"}
            bgColor="cyan.300"
          />
        </GridItem>
        <GridItem>
          <CardComponent 
            title="Sets Performed"
            data={latestMetric.sets || "No data"}
            bgColor="pink.300"
          />
        </GridItem>
      </Grid>
      <Divider mt={4} mb={4} />
      <Select mb={4} value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
        <option value="day">Past Day</option>
        <option value="week">Past Week</option>
        <option value="month">Past Month</option>
      </Select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sets" stroke="rgba(75, 192, 192, 1)" fill="rgba(75, 192, 192, 0.2)" />
          <Line type="monotone" dataKey="reps" stroke="rgba(153, 102, 255, 1)" fill="rgba(153, 102, 255, 0.2)" />
          <Line type="monotone" dataKey="time" stroke="rgba(255, 159, 64, 1)" fill="rgba(255, 159, 64, 0.2)" />
          <Line type="monotone" dataKey="calories" stroke="rgba(255, 99, 132, 1)" fill="rgba(255, 99, 132, 0.2)" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Meters;
