import "./Footer.css";
import { RESTAURANT } from "../data/menuCategories";

function Footer() {
  const { hours } = RESTAURANT;

  return (
    <footer className="site-footer">
      <div className="footer-hours">
        <h3>Opening Hours</h3>
        <div className="hours-grid">
          <div className="hours-row">
            <span className="hours-day">Mon – Fri</span>
            <span className="hours-time">
              {hours.weekdays.open} – {hours.weekdays.close}
            </span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Sat – Sun</span>
            <span className="hours-time">
              {hours.weekends.open} – {hours.weekends.close}
            </span>
          </div>
        </div>
      </div>
      <p className="footer-note">
        Thank you for dining with us at Tripura Cafe & Restaurant
      </p>
    </footer>
  );
}

export default Footer;
