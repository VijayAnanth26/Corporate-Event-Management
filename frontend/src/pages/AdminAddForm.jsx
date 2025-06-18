import { useState } from 'react';
import '../assets/css/AddEventForm.css';

const AdminAddEventForm = ({ onAddEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDescription: '',
    totalPackage: '',
    participationCount: '',
    charges: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEventDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const handleAddEvent = () => {
    const newEvent = { ...eventDetails };
    onAddEvent(newEvent);
    setEventDetails({
      eventName: '',
      eventDescription: '',
      totalPackage: '',
      participationCount: '',
      charges: '',
    });
  };

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form>
        <label>
          Event Name:
          <input
            type="text"
            id="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Event Description:
          <textarea
            id="eventDescription"
            value={eventDetails.eventDescription}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Total Package:
          <input
            type="text"
            id="totalPackage"
            value={eventDetails.totalPackage}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Participation Count:
          <input
            type="number"
            id="participationCount"
            value={eventDetails.participationCount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Charges:
          <input
            type="text"
            id="charges"
            value={eventDetails.charges}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" className="btn" onClick={handleAddEvent}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AdminAddEventForm;
