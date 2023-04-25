import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import {
  Box,
  Button,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";

function Imagegallary() {
  const [tag, setTag] = useState([]);
  const [image, setImage] = useState([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getTag() {
    const docRef = collection(db, "tags");
    const docSnap = await getDocs(docRef);

    let temp = [];

    docSnap.forEach((d) => {
      temp.push(d.data());
    });

    setTag(temp);
    setTagLoading(false);
  }

  async function getImage() {
    const docRef = collection(db, "images");
    const docSnap = await getDocs(docRef);

    let temp = [];

    docSnap.forEach((d) => {
      temp.push(d.data());
    });

    setImage(temp);
    setImageLoading(false);
  }

  useEffect(() => {
    setTagLoading(true);
    getTag();
    getImage();
  }, []);
  // console.log(image);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {currentImage && (
            <ModalHeader textAlign={"center"}>{currentImage.tag}</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            {currentImage && (
              <Image src={currentImage.url} alt={currentImage.tag} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800]">Image Gallery</p>
        </div>
      </div>

      <Tabs align="center" variant="soft-rounded" colorScheme="blue" my={6}>
        <TabList my={3}>
          <Tab
            _selected={{ color: "white", bg: "blue.500" }}
            transition={"0.5s"}
          >
            All
          </Tab>
          {tag.map((t) => {
            return (
              <Tab
                _selected={{ color: "white", bg: "blue.500" }}
                transition={"0.5s"}
              >
                {" "}
                {t.name}{" "}
              </Tab>
            );
          })}
        </TabList>
        {imageLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignSelf="center"
            margin="auto"
          />
        ) : (
          <TabPanels>
            <TabPanel
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={7}
              flexDirection={{ base: "column", md: "row" }}
              flexWrap={"wrap"}
            >
              {image.map((img) => {
                return (
                  <Box position={"relative"}>
                    <Image
                      src={img.url}
                      alt={img.tag}
                      objectFit={"contain"}
                      height="200px"
                      width="300px"
                    />
                    <Box
                      position={"absolute"}
                      opacity={0}
                      _hover={{ opacity: 1 }}
                      bgColor={"#326aec98"}
                      color={"white"}
                      width={"100%"}
                      height={"100%"}
                      top={0}
                      left={0}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      transition={"0.5s"}
                    >
                      <Text fontSize={"26px"} fontWeight={700}>
                        {" "}
                        {img.tag}{" "}
                      </Text>
                      <FaRegEye
                        size="30px"
                        cursor={"pointer"}
                        onClick={() => {
                          setCurrentImage(img);
                          onOpen();
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </TabPanel>
            {tag.map((t) => {
              return (
                <TabPanel
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={7}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  {image
                    .filter((img) => {
                      return img.tag === t.name;
                    })
                    .map((img) => {
                      return (
                        <Box position={"relative"}>
                          <Image
                            src={img.url}
                            alt={img.tag}
                            objectFit={"cover"}
                            width={"250px"}
                          />
                          <Box
                            position={"absolute"}
                            opacity={0}
                            _hover={{ opacity: 1 }}
                            bgColor={"#326aec98"}
                            color={"white"}
                            width={"100%"}
                            height={"100%"}
                            top={0}
                            left={0}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            transition={"0.5s"}
                          >
                            <Text fontSize={"26px"} fontWeight={700}>
                              {" "}
                              {img.tag}{" "}
                            </Text>
                            <FaRegEye
                              size="30px"
                              cursor={"pointer"}
                              onClick={() => {
                                setCurrentImage(img);
                                onOpen();
                              }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                </TabPanel>
              );
            })}
          </TabPanels>
        )}
      </Tabs>

      {/* <div className="container mx-auto my-3 p-2 flex gap-3 flex-wrap">
        {imageLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            alignSelf="center"
            margin="auto"
          />
        ) : (
          image.map((img) => {
            return (
              <Box>
                <Image src={img.url} alt={img.tag} />
              </Box>
            );
          })
        )}
      </div> */}
    </>
  );
}

export default Imagegallary;
