import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface CustomHolidayProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
interface CustomHoliday {
  name: string;
  date: string;
}
const CustomHolidayModal = ({
  showModal,
  setShowModal,
}: CustomHolidayProps) => {
  const [customHolidayData, setCustomHolidayData] = useState<CustomHoliday>({
    name: "",
    date: "",
  });

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setCustomHolidayData({
      name: "",
      date: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomHolidayData({
      ...customHolidayData,
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
            value={customHolidayData.name}
            name="name"
            onChange={handleChange}
          ></input>
          <input
            type="date"
            name="date"
            value={customHolidayData.date}
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
