import { useState } from 'react';
import '../assets/css/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false); // New state for submit success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);

    // Assuming the submission is successful, set the success state to true
    setSubmitSuccess(true);
  };

  return (
    <section className="section gray-bg" id="contactus">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>ENQUIRY</h2>
            </div>
          </div>
        </div>
        <div className="row flex-row-reverse">
          <div className="col-md-7 col-lg-8 m-15px-tb">
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="contactform contact_form" id="contact_form">
              <div className={`returnmessage ${submitSuccess ? 'valid-feedback' : 'invalid-feedback'} p-15px-b`} data-success="Your message has been received, We will contact you soon.">
        {submitSuccess ? 'Your message has been received, We will contact you soon.' : 'Please Fill Required Fields'}
      </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        className="form-control"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="send">
                      <button type="submit" id="send_message" className="px-btn theme">
                        <span>Contact Us</span> <i className="arrow"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 m-15px-tb">
            <div className="contact-name">
              <h5>Mail</h5>
              <p>info@domainname.com</p>
            </div>
            <div className="contact-name">
              <h5>Visit My Studio</h5>
              <p>Warnwe Park Streetperrine, <br />FL 33157 New York City</p>
            </div>
            <div className="contact-name">
              <h5>Phone</h5>
              <p>+01 123 654 8096</p>
            </div>
            {/* <div className="social-share nav">
              <a className="dribbble" href="#">
                <i className="fab fa-dribbble"></i>
              </a>
              <a className="behance" href="#">
                <i className="fab fa-behance"></i>
              </a>
              <a className="linkedin" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
