import "../assets/css/carousel.css"
import image1 from '../assets/images/pexels-teddy-yang-2263436.jpg';
// import image2 from '../assets/images/pexels-designecologist-2526105.jpg';
import image3 from '../assets/images/pexels-jonas-von-werne-2897462.jpg';
import image4 from '../assets/images/pexels-matheus-bertelli-3321793.jpg';
// import image5 from '../assets/images/pexels-pixabay-433452.jpg';

import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const CustomCarousel = () => (
  <MDBCarousel showControls showIndicators>
      <MDBCarouselItem itemId={1}>
        <img src={image1} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={image1} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={image3} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={4}>
        <img src={image4} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={5}>
        <img src={image1} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
);

export default CustomCarousel;