
// import { Button } from 'rsuite';
import '../assets/css/EventCard.css'; 

const AdminEventCard = ({ event, onBookEvent }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>
      <p>Price: ${event.price}</p>
      {/* <Button className="btn" onClick={onBookEvent}>Book Now</Button> */}
    </div>
  );
};

export default AdminEventCard;
