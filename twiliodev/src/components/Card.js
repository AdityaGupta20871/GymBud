import React from 'react';
import { Box, Heading, Text, Card, CardBody } from '@chakra-ui/react';

const CardComponent = ({ title, data, bgColor, bgImage }) => {
  return (
    <Box p={4} height="100%">
      <Card
        bg={bgImage ? "transparent" : bgColor}
        boxShadow="lg"
        borderRadius="md"
        p={6}
        height="100%"
        transition="all 0.3s"
        backgroundImage={bgImage ? `url(${bgImage})` : 'none'} // Corrected template literal
        backgroundSize="cover"
        backgroundPosition="center"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'xl',
        }}
      >
        <CardBody>
          <Heading as="h2" size="lg" mb={4} color="white">{title}</Heading>
          <Box>
            <Text fontSize="md" color="white">{data}</Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CardComponent;
