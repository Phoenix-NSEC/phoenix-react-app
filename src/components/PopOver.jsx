
import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";


function PopOver({ children, isOpen, triggerClose, showCloseBtn }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={triggerClose}>
      <ModalOverlay bg="rgba(0,0,0,0.7)" backdropFilter="blur(2px)" />
      <ModalContent
        color="white"
        width="95%"
        overflow="hidden"
        maxW="100%"
        maxH="90%"
        shadow="none"
        p={1}
        // borderRadius={20}
        backgroundColor="transparent"
        className="flex justify-center"
      >
        {showCloseBtn && (
          <ModalCloseButton
            backgroundColor="white"
            position="absolute"
            top="15px"
            right="15px"
            zIndex={100}
            rounded="full"
          />
        )}
        {children}
      </ModalContent>
    </Modal>
  );
}

export default PopOver;
