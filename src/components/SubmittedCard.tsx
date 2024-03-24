import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const SubmittedCard: React.FC = () => {
  const { formValue } = useFormContext<any>(); 

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" width="40%" margin="auto">
      <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center">Submitted Data:</Text>
      <Flex direction="column" alignItems="start">
        {Object.entries(formValue).map(([key, value]) => (
          <Box key={key} py={2}>
            <Text fontWeight="bold">{key}: </Text>
            {typeof value === 'object' && key !== 'gender' ? (
              <Box pl={4}>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <Box key={subKey} py={1}>
                    <Text>{subKey === 'label' ? subValue : `${subKey}: ${subValue}`}</Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text>{key === 'gender' ? value.label : value}</Text>
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SubmittedCard;
