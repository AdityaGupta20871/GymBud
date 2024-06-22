import React from 'react';
import { Box, Grid, GridItem, Heading, useBreakpointValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Meters from './components/Meters';
import ExerciseForm from './components/form';

function App() {
  const isSidebarVisible = useBreakpointValue({ base: false, md: true });

  return (
    <Router>
      <Box>
        <Navbar />
        <Grid templateColumns={{ base: '1fr', md: '75px 1fr', lg: '200px 1fr' }} minHeight="100vh" pt={20}>
          {isSidebarVisible && (
            <GridItem>
              <Sidebar />
            </GridItem>
          )}
          <GridItem p={{ base: 4, md: 6 }}>
            <Routes>
              <Route path="/" element={
                <Box>
                  <Meters />
                </Box>
              } />
              <Route path="/form" element={<ExerciseForm />} />
            </Routes>
          </GridItem>
        </Grid>
      </Box>
    </Router>
  );
}

export default App;