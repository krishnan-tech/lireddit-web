import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

const ChangePassword: NextPage = () => {
    const router = useRouter()
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, settokenError] = useState('');
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePassword({
                        newPassword: values.newPassword,
                        token: typeof router.query.token === "string" ? router.query.token : ""
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        if ("token" in errorMap) {
                            settokenError(errorMap.token)
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        // worked
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="newPassword" placeholder="new password" label="New Password or email"></InputField>
                        {tokenError ? (
                            <Box>
                                <Box style={{ color: 'red' }}>
                                    {tokenError}
                                </Box>
                                <NextLink href="/forgot-password">
                                    <Link>
                                        Generate again from here
                                    </Link>
                                </NextLink>
                            </Box>
                        ) : (
                            null
                        )}
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme='teal'>
                            change Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ChangePassword);