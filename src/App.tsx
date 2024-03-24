import React, { useState } from 'react';
import {
  Button,
  Box, Heading
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import SubmittedCard from './components/SubmittedCard.tsx';
import Form from './components/Form.tsx';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  techStack: string[];
  email: string;
  phoneNumber: string;
}


const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, getValues
  } = useForm<FormData>();

  const submitForm = async (formData: FormData) => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsSubmitted(true)
      const finalFormValue = getValues()
      setFormValue(finalFormValue)
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...{ formValue }}>
      <Box maxW="xl" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" marginBottom={10} display="flex" justifyContent="center">
        <Heading as="h1" size="md" >User Details</Heading>
      </Box>
      <Box maxW="xl" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" marginBottom={10}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Form control={control} errors={errors} />
          <Button type="submit" colorScheme="teal" mt={4} isLoading={isLoading}>
            {isLoading ? 'Submitting' : 'Submit'}
          </Button>
        </form>
      </Box>
      {isSubmitted && <SubmittedCard />}
    </FormProvider>
  );
};

export default App;
