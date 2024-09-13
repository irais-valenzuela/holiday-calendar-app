import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomHoliday } from "../constants";
import { organizeCustomHolidays } from "../helperFunctions";

interface CustomHolidayProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setModalData: (value: CustomHoliday) => void;
  modalData: CustomHoliday;
  setCustomHolidays: (value: {
    [key: number]: { [key: number]: string[] };
  }) => void;
}
const CustomHolidayModal = ({
  showModal,
  setShowModal,
  setModalData,
  modalData,
  setCustomHolidays,
}: CustomHolidayProps) => {
  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setModalData({
      name: "",
      date: "",
    });
    organizeCustomHolidays(modalData, setCustomHolidays);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add your holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Provide the name of the holiday and date</Modal.Body>
        <form onSubmit={handleClose}>
          <input
            type="text"
            placeholder="Holiday Name"
            value={modalData.name}
            name="name"
            onChange={handleChange}
          ></input>
          <input
            type="date"
            name="date"
            value={modalData.date}
            onChange={handleChange}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CustomHolidayModal;
