import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import { useForgotPasswordMutation } from '../generated/graphql';

const forgotPassword: React.FC<{}> = ({ }) => {
    const [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setcomplete] = useState(false);
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values, { setErrors }) => {
                    await forgotPassword(values)
                    setcomplete(true);
                }}
            >
                {({ isSubmitting }) => complete ?
                    (
                        <Box>if an acount with that email exists, we send you an email </Box>
                    ) : (
                        <Form>
                            <InputField name="email" placeholder="email" label="Email" type="email"></InputField>
                            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme='teal'>
                                Forgot Password
                        </Button>
                        </Form>
                    )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(forgotPassword);