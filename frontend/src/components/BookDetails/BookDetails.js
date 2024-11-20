import React from "react";
import "./BookDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  if (!book || !book.volumeInfo) {
    return null;
  }

  const handleReadClick = () => {
    if (book.volumeInfo.previewLink) {
      window.open(book.volumeInfo.previewLink, "_blank");
    } else {
      alert("Sorry, no preview available for this book.");
    }
  };

  return (
    <div className="book-details-container">
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x192.png"
        }
        alt={book.volumeInfo.title}
        className="book-details-cover"
      />
      <div className="book-details">
        <h3>{book.volumeInfo.title}</h3>
        <p>
          Author(s): {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
        </p>
        <p>
          Genre(s): {book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
        </p>
        <p>
          Description:{" "}
          {book.volumeInfo.description || "No description available"}
        </p>
      </div>
      <div className="book-details-buttons clearfix">
        <Button
          variant="contained"
          className="read-button"
          onClick={handleReadClick}
          style={{ marginRight: "10px" }}
        >
          Read More from Google
        </Button>
        <Button
          variant="outlined"
          className="close-button clearfix"
          onClick={() => navigate(-1)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookDetails;
