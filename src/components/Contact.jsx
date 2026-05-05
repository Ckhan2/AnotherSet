import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
const Contact = () => {
  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <img
        src="./gymbanner.jpg"
        alt="gym banner"
        style={{ width: "100%", display: "block" }}
      />

      <FaWhatsapp />

      <h1
        style={{
          position: "absolute",
          top: "375px",
          left: "1px",
          color: "white",
          background: "#273444",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        We promise to provide you with the best experience possible.
        If you have any questions, comments, or concerns, please don't hesitate
        to reach out to us at 1800-HELP.
      </h1>
    </div>
  );
};

export default Contact;