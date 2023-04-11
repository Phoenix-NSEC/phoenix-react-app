import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Select,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import phoenixBanner from "../../static/img/phoenixBanner.png";
import GreenTick from "../../static/images/check-green.gif";
import { Field, Formik } from "formik";
import axios from "axios";
import { addMember } from "../../utils/member";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const MemberRegistration = () => {
  const [profilePic, setProfilePic] = useState();
  const [transactionPic, setTransactionPic] = useState();
  const [loading, setLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [refID, setRefID] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getContact() {
    const docRef = collection(db, "contact");
    const docSnap = await getDocs(docRef);

    let temp = [];

    docSnap.forEach((d) => {
      temp.push(d.data());
    });

    setContact(temp);
    setContactLoading(false);
  }

  useEffect(() => {
    setContactLoading(true);
    getContact();
  }, []);
  // console.log(contact);

  const deptChoices = [
    {
      value: "CSE",
      display_name: "Computer Science and Engineering",
    },
    {
      value: "ECE",
      display_name: "Electronics and Communication Engineering",
    },
    {
      value: "EE",
      display_name: "Electrical Engineering",
    },
    {
      value: "ME",
      display_name: "Mechanical Engineering",
    },
    {
      value: "CE",
      display_name: "Civil Engineering",
    },
    {
      value: "IT",
      display_name: "Information Technology",
    },
    {
      value: "BME",
      display_name: "Biomedical Engineering",
    },
    {
      value: "AIML",
      display_name: "Artificial Intelligence and Machine Learning",
    },
    {
      value: "BCA",
      display_name: "Bachelor of Computer Applications",
    },
    {
      value: "MCA",
      display_name: "Master of Computer Applications",
    },
    {
      value: "MBA",
      display_name: "Master of Business Administration",
    },
    {
      value: "MTECH",
      display_name: "Master of Technology",
    },
    {
      value: "BBA",
      display_name: "Bachelor of Business Administration",
    },
    {
      value: "BSCCS",
      display_name: "Bachelor of Science in Computer Science & Cyber Security",
    },
    {
      value: "CSBS",
      display_name: "Computer Science and Business Systems",
    },
    {
      value: "AEIE",
      display_name: "Applied Electronics & Instrumentation Engineering",
    },
  ];

  const genderOptions = [
    {
      value: "M",
      display_name: "Male",
    },
    {
      value: "F",
      display_name: "Female",
    },
    {
      value: "O",
      display_name: "Other",
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/home", { replace: true });
        }}
      >
        <ModalOverlay />
        <ModalContent mx={"10px"} bgColor="#FAFBF8">
          <ModalCloseButton
            onClick={() => {
              onClose();
              navigate("/home", { replace: true });
            }}
          />
          <ModalBody textAlign={"center"} margin="auto">
            <Image
              src={GreenTick}
              alt={"GreenTick"}
              width="120px"
              mx="auto"
              my={"10px"}
            />
            <Text fontSize="md" as="b">
              Registration form successfully submitted!
            </Text>
            <br />
            <Text fontSize="md" as="b">
              Reference ID: {refID}
            </Text>
            <br />
            <Text fontSize="sm" as="i" fontWeight={500} textColor="#343434">
              Note: Take a screenshot of the successful submission of this
              registration form for further communication
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                navigate("/home", { replace: true });
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          if (!values.profilePicUploaded) {
            return alert("Please upload your picture");
          } else if (!values.transactionPicUploaded) {
            return alert("Please upload the transaction proof screenshot");
          } else {
            // const formData = new FormData();
            // formData.append("name", values.name);
            // formData.append("email", values.email);
            // formData.append("sex", values.gender);
            // formData.append("whatsapp", values.whatsapp);
            // formData.append("contact", values.contact);
            // formData.append("department", values.department);
            // formData.append("graduation", values.graduation);
            // formData.append("section", values.section);
            // formData.append("student_id", values.studentId);
            // formData.append("avatar", profilePic);
            // formData.append("is_verified", false);
            // formData.append("payment_image", transactionPic);
            // console.log(formData);

            setLoading(true);
            await addMember(values, profilePic, transactionPic)
              .then((d) => {
                setRefID(d);
                if (d) {
                  values.profilePicUploaded = false;
                  values.transactionPicUploaded = false;
                  values.name = "";
                  values.email = "";
                  values.gender = "";
                  values.contact = "";
                  values.whatsapp = "";
                  values.department = "";
                  values.section = "";
                  values.graduation = "";
                  values.studentId = "";
                  onOpen();
                } else {
                  return alert("Already submitted once with this email");
                }
              })
              .catch((err) => {
                console.log(err);
                toast({
                  title: "Error Occured",
                  description: "Registration Failed...Try Again",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                });
                // alert(err);
              });

            setLoading(false);
            // console.log(values, profilePic, transactionPic);
          }
        }}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <form className="mt-[100px]">
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
                  fontWeight={500}
                  maxW="650px"
                  borderRadius="10px"
                  boxShadow="1px 2px 5px #00000021"
                >
                  <Box
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    maxW="100%"
                  >
                    <Box>
                      <Text fontSize="md">
                        Please Pay the fees of ₹200. <br />
                        For any issues contact: <br />
                        <Box
                          my={2}
                          display={"flex"}
                          gap={2}
                          flexDirection={{ base: "column", md: "row" }}
                        >
                          {contact &&
                            contact.map((c) => {
                              return (
                                <Text as="b" mx={1} fontWeight={500}>
                                  {c.name}
                                  <Text
                                    as="b"
                                    mx={1}
                                    fontWeight={500}
                                    fontSize={"sm"}
                                    textColor="#343434"
                                  >
                                    ({c.designation}) <br />
                                  </Text>
                                  {c.phone}
                                </Text>
                              );
                            })}
                        </Box>
                      </Text>
                    </Box>
                    {/* <Box>
                      <Image
                        src={contact.QR}
                        w={"120px"}
                      />
                    </Box> */}
                  </Box>
                  <Box p={6} alignSelf="center" maxW="100%" textAlign="center">
                    <Text
                      fontSize="sm"
                      as="i"
                      fontWeight={500}
                      textColor="#343434"
                    >
                      Note: Take a screenshot of the successful submission of
                      this registration form for further communication
                    </Text>
                  </Box>
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
                  <Text mb="10px" color="black">
                    Name
                  </Text>
                  <FormControl isInvalid={!values.name && touched.name}>
                    <Field
                      as={Input}
                      id={"name"}
                      name={"name"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Enter your full name"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Email Id
                  </Text>
                  <FormControl isInvalid={!values.email && touched.email}>
                    <Field
                      as={Input}
                      id={"email"}
                      name={"email"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Your personal email id"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Gender
                  </Text>
                  <FormControl isInvalid={!values.gender && touched.gender}>
                    <Field
                      as={Select}
                      id={"gender"}
                      name={"gender"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Choose Your Gender"}
                      variant="flushed"
                    >
                      {genderOptions.map((each, index) => (
                        <option key={index} value={each.value}>
                          {each.display_name}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    WhatsApp No.
                  </Text>
                  <FormControl isInvalid={!values.whatsapp && touched.whatsapp}>
                    <Field
                      as={Input}
                      id={"whatsapp"}
                      name={"whatsapp"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Your Whatsapp Number"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Contact No.
                  </Text>
                  <FormControl isInvalid={!values.contact && touched.contact}>
                    <Field
                      as={Input}
                      id={"contact"}
                      name={"contact"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Your Contact Number"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Department
                  </Text>
                  <FormControl
                    isInvalid={!values.department && touched.department}
                  >
                    <Field
                      as={Select}
                      id={"department"}
                      name={"department"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Choose Your Department"}
                      variant="flushed"
                    >
                      {deptChoices.map((each, index) => (
                        <option key={index} value={each.value}>
                          {each.display_name}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Section
                  </Text>
                  <FormControl isInvalid={!values.section && touched.section}>
                    <Field
                      as={Input}
                      id={"section"}
                      name={"section"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      maxLength="1"
                      textTransform="uppercase"
                      placeholder={"Your section"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Graduation Year
                  </Text>
                  <FormControl
                    isInvalid={!values.graduation && touched.graduation}
                  >
                    <Field
                      as={Input}
                      id={"graduation"}
                      name={"graduation"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Your graduation year"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Student Id
                  </Text>
                  <FormControl
                    isInvalid={!values.studentId && touched.studentId}
                  >
                    <Field
                      as={Input}
                      id={"studentId"}
                      name={"studentId"}
                      type={"text"}
                      validate={(val) => {
                        let error;
                        if (!val) {
                          error = "This must be filled";
                        }
                        return error;
                      }}
                      placeholder={"Your Student Id"}
                      variant="flushed"
                    />
                    <FormErrorMessage>
                      This field must be filled
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Your Picture
                    <Text
                      as="b"
                      mx={1}
                      fontWeight={500}
                      fontSize={"sm"}
                      textColor="#343434"
                    >
                      (Upload only images[.jpg, .png, .jpeg])
                    </Text>
                  </Text>
                  <FormControl
                    isInvalid={
                      !values.profilePicUploaded && touched.profilePicUploaded
                    }
                  >
                    <Field
                      p="1"
                      as={Input}
                      accept={"image/jpg, image/jpeg, image/png"}
                      id={"profilePic"}
                      name={"profilePic"}
                      type={"file"}
                      onChange={(e) => {
                        values.profilePicUploaded = true;
                        setProfilePic(e.target.files[0]);
                      }}
                    />
                    <FormErrorMessage>
                      File need to be uploaded
                    </FormErrorMessage>
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
                  <Text mb="10px" color="black">
                    Transaction Proof Screenshot
                    <Text
                      as="b"
                      mx={1}
                      fontWeight={500}
                      fontSize={"sm"}
                      textColor="#343434"
                    >
                      (Upload only images[.jpg, .png, .jpeg])
                    </Text>
                  </Text>
                  <FormControl
                    isInvalid={
                      !values.transactionPicUploaded &&
                      touched.transactionPicUploaded
                    }
                  >
                    <Field
                      p="1"
                      as={Input}
                      accept={"image/jpg, image/jpeg, image/png"}
                      id={"transactionPic"}
                      name={"transactionPic"}
                      type={"file"}
                      onChange={(e) => {
                        values.transactionPicUploaded = true;
                        setTransactionPic(e.target.files[0]);
                      }}
                    />
                    <FormErrorMessage>
                      File need to be uploaded
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Button
                  loadingText="Submitting"
                  isLoading={loading}
                  colorScheme="blue"
                  variant="solid"
                  my="15px"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Submit
                </Button>
              </Flex>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default MemberRegistration;
