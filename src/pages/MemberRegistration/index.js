import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, Image, Input, Text } from '@chakra-ui/react';
import phoenixBanner from "../../static/img/phoenixBanner.png"
import { Field, Formik } from 'formik';
import axios from 'axios';

const MemberRegistration = () => {
    const [profilePic, setProfilePic] = useState();
    const [transactionPic, setTransactionPic] = useState();

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                gender: "",
                contact: "",
                whatsapp: "",
                department: "",
                section: "",
                graduation: "",
                studentId: "",
                profilePicUploaded: false,
                transactionPicUploaded: false,
            }}
            onSubmit={async (values) => {
                if (values.profilePicUploaded && values.transactionPicUploaded) {
                    const formData = new FormData();
                    formData.append("name", values.name)
                    formData.append("email", values.email)
                    formData.append("sex", values.gender)
                    formData.append("whatsapp", values.whatsapp)
                    formData.append("contact", values.contact)
                    formData.append("department", values.department)
                    formData.append("graduation", values.graduation)
                    formData.append("section", values.section)
                    formData.append("student_id", values.studentId)
                    formData.append("avatar", profilePic)
                    formData.append("is_verified", false)
                    formData.append("payment_image", transactionPic)
                    console.log(formData);

                    await axios.post("https://api.phoenixnsec.in/api/v1/member/", formData)
                    .then(res => {
                        console.log("successful")
                    }).catch(err => {
                        console.log(err.message);
                    })
                    console.log(values, profilePic, transactionPic)
                }
            }}
        >
            {({ handleSubmit, errors, touched, values }) => (
                <form>
                    <Box minH="calc(100vh - 60px)" bg="#f1fffa" py="30px">
                    <Flex direction="column" alignItems="center">
                        <Image
                            src={phoenixBanner}
                            w="80vw"
                            maxW="650px"
                            margin="auto"
                            borderRadius="10px"
                            mb="20px"
                        />
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                        <Text mb="10px" color="black">Name</Text>
                        <FormControl isInvalid={!values.name && touched.name}>
                            <Field
                                as={Input}
                                id={"name"}
                                name={"name"}
                                type={"text"}
                                validate={val => {
                                    let error;
                                    if (!val) {
                                        error = "This must be filled";
                                    }
                                    return error;
                                }}
                                placeholder={"Enter your full name"}
                                variant="flushed"
                            />
                            <FormErrorMessage>This field must be filled</FormErrorMessage>
                        </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Email Id</Text>
                            <FormControl isInvalid={!values.email && touched.email}>
                                <Field
                                    as={Input}
                                    id={"email"}
                                    name={"email"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your personal email id"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">WhatsApp No.</Text>
                            <FormControl isInvalid={!values.whatsapp && touched.whatsapp}>
                                <Field
                                    as={Input}
                                    id={"whatsapp"}
                                    name={"whatsapp"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your Whatsapp Number"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Contact No.</Text>
                            <FormControl isInvalid={!values.contact && touched.contact}>
                                <Field
                                    as={Input}
                                    id={"contact"}
                                    name={"contact"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your Contact Number"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Department</Text>
                            <FormControl isInvalid={!values.department && touched.department}>
                                <Field
                                    as={Input}
                                    id={"department"}
                                    name={"department"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your Department"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Section</Text>
                            <FormControl isInvalid={!values.section && touched.section}>
                                <Field
                                    as={Input}
                                    id={"section"}
                                    name={"section"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your section"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Graduation Year</Text>
                            <FormControl isInvalid={!values.graduation && touched.graduation}>
                                <Field
                                    as={Input}
                                    id={"graduation"}
                                    name={"graduation"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your graduation year"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Student Id</Text>
                            <FormControl isInvalid={!values.studentId && touched.studentId}>
                                <Field
                                    as={Input}
                                    id={"studentId"}
                                    name={"studentId"}
                                    type={"text"}
                                    validate={val => {
                                        let error;
                                        if (!val) {
                                            error = "This must be filled";
                                        }
                                        return error;
                                    }}
                                    placeholder={"Your Student Id"}
                                    variant="flushed"
                                />
                                <FormErrorMessage>This field must be filled</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                        <Text mb="10px" color="black">Your Picture</Text>
                        <FormControl isInvalid={!values.profilePicUploaded && touched.profilePicUploaded}>
                            <Field
                                as={Input}
                                id={"profilePic"}
                                name={"profilePic"}
                                type={"file"}
                                onChange={(e) => {
                                    values.profilePicUploaded = true;
                                    setProfilePic(e.target.files[0])
                                }}
                            />
                            <FormErrorMessage>File need to be uploaded</FormErrorMessage>
                        </FormControl>
                        </Box>
                        <Box
                            bg="white"
                            p="20px"
                            w="80vw"
                            mb="10px"
                            maxW="650px"
                            borderRadius="10px"
                            boxShadow="1px 2px 5px #00000021"
                        >
                            <Text mb="10px" color="black">Transaction Proof Screenshot</Text>
                            <FormControl isInvalid={!values.transactionPicUploaded && touched.transactionPicUploaded}>
                                <Field
                                    as={Input}
                                    id={"transactionPic"}
                                    name={"transactionPic"}
                                    type={"file"}
                                    onChange={(e) => {
                                        values.transactionPicUploaded = true;
                                        setTransactionPic(e.target.files[0])
                                    }}
                                />
                                <FormErrorMessage>File need to be uploaded</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Button
                            loadingText="Submitting"
                            colorScheme="blue"
                            variant="solid"
                            my="15px"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSubmit(e)
                            }}
                        >
                            Submit
                        </Button>
                    </Flex>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default MemberRegistration
