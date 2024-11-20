import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";
import { useSnackbar } from "notistack";

const ContactForm = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    bookTitle: "",
    genre: "",
    message: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    if (e.target.name === "bookFile") {
      setContactData({ ...contactData, [e.target.name]: e.target.files[0] });
    } else {
      setContactData({ ...contactData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/user/api/contact", contactData);
      setContactData({
        name: "",
        email: "",
        bookTitle: "",
        genre: "",
        message: "",
      });

      // Enqueue success snackbar
      enqueueSnackbar("Book request submitted successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      // Enqueue error snackbar
      enqueueSnackbar(`Error submitting contact form: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Request a New Book</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactData.name}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="bookTitle" className="label">
            Book Title
          </label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={contactData.bookTitle}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="genre" className="label">
            Book Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={contactData.genre}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        {/* <div className="form-field">
          <label htmlFor="bookFile" className="label">
            Upload Book File (Optional)
          </label>
          <input
            type="file"
            id="bookFile"
            name="bookFile"
            onChange={handleInputChange}
            accept=".pdf"
            className="input"
          />
        </div> */}
        <div className="form-field">
          <label htmlFor="message" className="label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={contactData.message}
            onChange={handleInputChange}
            className="textarea"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
