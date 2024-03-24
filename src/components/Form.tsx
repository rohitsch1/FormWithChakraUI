import React from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    Flex, GridItem, Grid
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { Select, components } from 'chakra-react-select';
import { FaCheck } from 'react-icons/fa';

interface CustomOptionProps {
    children: React.ReactNode;
    isSelected: boolean;
}

const CustomOption: React.FC<CustomOptionProps> = ({ children, isSelected, ...props }) => {
    return (
        <components.Option {...props}>
            <Flex justify="space-between" align="center">
                {children}
                {isSelected && (
                    <Box ml={2}>
                        <FaCheck color="green" />
                    </Box>
                )}
            </Flex>
        </components.Option>
    );
};



interface ContactInfoProps {
    control: any;
    errors: any;
}

const Form: React.FC<ContactInfoProps> = ({ control, errors }) => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
                <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name:</FormLabel>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'First Name is required' }}
                        render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
            <GridItem>
                <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name:</FormLabel>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Last Name is required' }}
                        render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
            <GridItem>
                <FormControl isInvalid={!!errors.gender}>
                    <FormLabel htmlFor="gender">Gender:</FormLabel>
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Gender is required' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                components={{ Option: CustomOption }}
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'other', label: 'Other' }
                                ]}
                                isSearchable={false}
                                placeholder="Select gender"
                            />
                        )}
                    />
                    <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
            <GridItem>
                <FormControl isInvalid={!!errors.dob}>
                    <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
                    <Controller
                        name="dob"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Date of Birth is required' }}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                    <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
                <FormControl isInvalid={!!errors.techStack}>
                    <FormLabel>Tech Stack:</FormLabel>
                    <Controller
                        name="techStack"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <>
                                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                    {field.value.map((tech: string, index: number) => (
                                        <Box key={index}>
                                            <Box display="flex" alignItems="center">
                                                <Input
                                                    value={tech}
                                                    onChange={(e) => {
                                                        const newTechStack = [...field.value];
                                                        newTechStack[index] = e.target.value;
                                                        field.onChange(newTechStack);
                                                    }}
                                                />
                                                {index !== 0 && (
                                                    <Button
                                                        type="button"
                                                        onClick={() => {
                                                            const newTechStack = [...field.value];
                                                            newTechStack.splice(index, 1);
                                                            field.onChange(newTechStack);
                                                        }}
                                                        ml={2}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </Box>
                                        </Box>
                                    ))}
                                </Grid>
                                <Button
                                    type="button"
                                    onClick={() => field.onChange([...field.value, ''])}
                                    mt={2}
                                    variant="outline"
                                >
                                    Add Tech
                                </Button>
                            </>
                        )}
                    />
                    <FormErrorMessage>{errors.techStack?.message}</FormErrorMessage>
                </FormControl>

            </GridItem>
            <GridItem colSpan={2}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email Address:</FormLabel>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Email is required', pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid Email address format'
                            }
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
                <FormControl isInvalid={!!errors.phoneNumber}>
                    <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Phone Number is required',
                            pattern: {
                                value: /^\+91\d{10}$/,
                                message: 'Invalid phone number format E.g: use +91'
                            }
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                </FormControl>
            </GridItem>
        </Grid>
    );
};

export default Form;
