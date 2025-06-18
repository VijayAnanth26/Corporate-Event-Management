// import React from 'react';
import "../assets/css/CardList.css";
import Cards from "./Cards";
import EventNavbar from "./EventNavbar";
// import image1 from '../assets/images/pexels-caleb-oquendo-11140383.jpg';
import image2 from '../assets/images/pexels-vishnu-r-nair-1105666.jpg';
import image3 from '../assets/images/pexels-pixabay-209977.jpg';
import image4 from '../assets/images/pexels-matheus-bertelli-2608517.jpg';
import image5 from '../assets/images/pexels-thirdman-7652058.jpg';
const events = [
  { id: 1, type: 'conference', description: 'A conference on corporate events.', amount: '$50', date: '2024-03-15', imageURL: image4 },
  { id: 4, type: 'concerts', description: 'Another live music performance.', amount: '$25', date: '2024-04-20', imageURL: image2 },
  { id: 6, type: 'competitions', description: 'Another thrilling sports competition.', amount: '$15', date: '2024-05-10', imageURL: image3 },
  { id: 7, type: 'workshops', description: 'Hands-on learning session.', amount: '$60', date: '2024-06-05', imageURL: image4 },
  { id: 10, type: 'businessMixers', description: 'Exclusive business networking event.', amount: '$70', date: '2024-07-15', imageURL: image5 },
  { id: 12, type: 'hackathons', description: 'Innovative hackathon challenge.', amount: '$50', date: '2024-08-20', imageURL: image4 },
];



const eventCategories = {
  Corporate: ['conference'],
  Entertainment: ['concerts'],
  Sports: ['competitions'],
  Educational: ['workshops'],
  Networking: ['businessMixers'],
  TechnologyInnovation: ['hackathons'],
};

const categorizeEvents = () => {
  const categorizedEvents = {};

  Object.keys(eventCategories).forEach(category => {
    categorizedEvents[category] = events.filter(event => eventCategories[category].includes(event.type));
  });

  return categorizedEvents;
};

const CardList = () => {
  const categorizedEvents = categorizeEvents();

  return (
    <div>
      <div>
        <EventNavbar />
        <p />
      </div>
      <div className="card-list-container">
        {Object.keys(categorizedEvents).map(category => (
          <div key={category}>
            <h2>{category}</h2>
            {categorizedEvents[category].map((event) => (
              <Cards key={event.id} event={event} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
