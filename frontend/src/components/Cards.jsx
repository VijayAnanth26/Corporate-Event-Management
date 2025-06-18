import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';


const Cards = ({ event }) => {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  return (
    <>
      <div>
        <MDBCard style={{ maxWidth: '540px' }}>
          <MDBRow className='g-0'>
          <MDBCardImage
                src={event.imageURL}
                alt={event.name}
                fluid
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>{event.type}</MDBCardTitle>
                <MDBCardText>{event.description}</MDBCardText>
                <MDBCardText>Date: {event.date}</MDBCardText>
                <Button
                  onClick={toggleOpen}
                  type='button'
                  data-mdb-ripple-init
                  data-mdb-modal-init
                >
                  Book Now
                </Button>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ color: '#9719e0' }}>{event.name}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <h5 style={{ color: '#727272' }}>{event.description}</h5>
              <br />
              <h5 style={{ color: '#727272' }}>Event Amount: {event.amount}</h5>
              <br />
              <h5 style={{ color: '#727272' }}>Date: {event.date}</h5>
              <br />
              <p>
                
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <Button>
                <Link to={'/payment'} style={{ textDecoration: 'none' }}>
                  Book Now
                </Link>
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Cards;
