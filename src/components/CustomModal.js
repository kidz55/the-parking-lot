import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    position: 'relative',
    width: '80vw',
    height: '80vh',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CustomModal = ({ modalIsOpen, content }) => {
  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} style={customStyles}>
      {content}
    </Modal>
  );
};

export default CustomModal;
