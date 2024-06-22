import React from 'react';
import { Box, Flex, Link, Button, useColorMode, IconButton, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import buddy from '../assets/buddy.jfif'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      bg="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)"
      px={4}
      boxShadow="md"
      position="fixed"
      top="5px"
      left="20px"
      right="20px"
      borderRadius="15px"
      zIndex="1000"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Use the Image component instead of Box */}
        <Image src={buddy} alt="Buddy" boxSize="50px" objectFit="cover" borderRadius="10px" />

        <Flex alignItems="center">
          <Link 
            as={RouterLink} 
            to="/" 
            color={colorMode === "light" ? "black" : "white"} 
            mr={4} 
            _hover={{ color: "teal.300" }}
          >
            Dashboard
          </Link>
          <Link 
            as={RouterLink} 
            to="/form" 
            color={colorMode === "light" ? "black" : "white"} 
            mr={4} 
            _hover={{ color: "teal.300" }}
          >
            Form
          </Link>
          <Button colorScheme="teal" variant="solid" mr={4}>Log out</Button>
          <IconButton
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            colorScheme="teal"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
