// BookViewer.js
import React from "react";
import { useLocation } from "react-router-dom";

const BookViewer = () => {
  const location = useLocation();
  const bookData = location.state.bookData;

  return bookData ? (
    <embed src={bookData} type="application/pdf" width="100%" height="600px" />
  ) : (
    <div>Loading...</div>
  );
};

export default BookViewer;
