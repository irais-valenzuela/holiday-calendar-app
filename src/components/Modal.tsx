import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void
}

const CustomHolidayModal = ({showModal, setShowModal}: Props) => {

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Provide the Name of the holiday and date</Modal.Body>
        <input type='text' placeholder='Holiday Name'></input>
        <input type='date' />

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomHolidayModal;