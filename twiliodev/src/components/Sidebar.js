import React, { useState } from 'react';
import { Box, VStack, Link, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Box 
      pos="fixed" 
      top="100px" // Adjusted to avoid overlapping with navbar
      left="20px"
      h="calc(100vh - 90px)" // Adjusted to account for the navbar height
      w={isHovered ? "200px" : "100px"} 
      bg="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)"
      color="white" 
      borderRadius="15px"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      transition="width 0.2s"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      p={4} // Add padding to prevent text overflow
    >
      <VStack spacing={6} align="center" mt={10}>
        <Tooltip label="Dashboard" placement="right">
          <Link as={RouterLink} to="/" display="flex" alignItems="center" w="100%" _hover={{ textDecoration: 'none' }}>
            <Box 
              display="flex" 
              alignItems="center" 
              w="100%" 
              p={2} 
              borderRadius="md" 
              _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
              transition="background-color 0.2s"
            >
              <IconButton 
                icon={<FiHome />} 
                aria-label="Dashboard" 
                colorScheme="blue" 
                variant="ghost" 
                size="lg" 
                mx="auto" 
              />
              {isHovered && <Text ml={4} color='black' fontFamily='bold' flex="1">Dashboard</Text>}
            </Box>
          </Link>
        </Tooltip>
        <Tooltip label="Form" placement="right">
          <Link as={RouterLink} to="/form" display="flex" alignItems="center" w="100%" _hover={{ textDecoration: 'none' }}>
            <Box 
              display="flex" 
              alignItems="center" 
              w="100%" 
              p={2} 
              borderRadius="md" 
              _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
              transition="background-color 0.2s"
            >
              <IconButton 
                icon={<FiUser />} 
                aria-label="Form" 
                colorScheme="blue" 
                variant="ghost" 
                size="lg" 
                mx="auto" 
              />
              {isHovered && <Text ml={4} color='black' fontFamily='bold' flex="1">Form</Text>}
            </Box>
          </Link>
        </Tooltip>
        <Tooltip label="Settings" placement="right">
          <Link href="#" display="flex" alignItems="center" w="100%" _hover={{ textDecoration: 'none' }}>
            <Box 
              display="flex" 
              alignItems="center" 
              w="100%" 
              p={2} 
              borderRadius="md" 
              _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
              transition="background-color 0.2s"
            >
              <IconButton 
                icon={<FiSettings />} 
                aria-label="Settings" 
                colorScheme="blue" 
                variant="ghost" 
                size="lg" 
                mx="auto" 
              />
              {isHovered && <Text ml={4} color='black' fontFamily='bold' flex="1">Settings</Text>}
            </Box>
          </Link>
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default Sidebar;
