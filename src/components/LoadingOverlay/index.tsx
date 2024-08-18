import { Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const LoadingOverlay = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <Modal
      isCentered
      isOpen={!!isFetching || !!isMutating}
      onClose={() => undefined}
    >
      <ModalOverlay />
      <ModalContent
        alignItems='center'
        backgroundColor='transparent'
        boxShadow='none'
      >
        <Spinner color='accent' size='xl' />
      </ModalContent>
    </Modal>
  );
};

export default LoadingOverlay;
