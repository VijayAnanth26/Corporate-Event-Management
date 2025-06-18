// Import Link from react-router-dom
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer_area section_padding_130_0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              <p>Discover and join our upcoming events to stay connected with the latest in corporate happenings.</p>
              <div className="footer_social_area">
                {/* Use Link instead of a */}
                <Link to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></Link>
                <Link to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-pinterest"></i></Link>
                <Link to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i className="fa fa-skype"></i></Link>
                <Link to="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">About</h5>
              <div className="footer_menu">
                <ul>
                  <li><Link to="#">About Us</Link></li>
                  <li><Link to="#">Corporate Sale</Link></li>
                  <li><Link to="#">Terms &amp; Policy</Link></li>
                  <li><Link to="#">Community</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">Support</h5>
              <div className="footer_menu">
                <ul>
                  <li><Link to="#">Help</Link></li>
                  <li><Link to="#">Support</Link></li>
                  <li><Link to="#">Privacy Policy</Link></li>
                  <li><Link to="#">Term &amp; Conditions</Link></li>
                  <li><Link to="#">Help &amp; Support</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">Contact</h5>
              <div className="footer_menu">
                <ul>
                  <li><Link to="#">Call Centre</Link></li>
                  <li><Link to="#">Email Us</Link></li>
                  <li><Link to="#">Term &amp; Conditions</Link></li>
                  <li><Link to="#">Help Center</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
