import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface CardModalProps {
  title: string;
  showModal: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export default function CardModal({
  title,
  showModal,
  handleCloseModal,
  children
}: CardModalProps) {

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
