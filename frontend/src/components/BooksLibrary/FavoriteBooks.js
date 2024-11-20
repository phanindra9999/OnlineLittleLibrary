import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Button,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const FavoriteBooks = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getFavoriteBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/favorites/${sessionStorage.getItem(
          "username"
        )}`
      );
      const data = await response.json();
      setBooks(data.favorites);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBookData = async (sno) => {
    const response = await fetch(`http://localhost:4000/user/book/${sno}`);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([new Uint8Array(arrayBuffer)], {
      type: "application/pdf",
    });
    const pdfUrl = URL.createObjectURL(blob);
    setBookData(pdfUrl);
    navigate(`/book/${sno}`, { state: { bookData: pdfUrl } });
  };

  const handleRemoveFromFavorites = async (book) => {
    const response = await fetch(
      `http://localhost:4000/user/favorites/removeFavorite`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: sessionStorage.getItem("username"),
          sno: book.sno,
          bookname: book.name,
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      enqueueSnackbar(data.message, { variant: "success" });
      getFavoriteBooks();
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };
  useEffect(() => {
    getFavoriteBooks();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        m={1}
      >
        <Typography variant="h4" component="div">
          Your Favorite Books
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        m={1}
      >
        {books.map((book, index) => (
          <Box m={1}>
            <Card
              key={book.sno}
              sx={{
                width: "22rem",
                height: "10rem",
                backgroundColor: index % 2 === 0 ? "lightgray" : "white",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.6)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {book.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {book.genre}
                </Typography>
              </CardContent>
            </Card>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                onClick={() => handleRemoveFromFavorites(book)}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
              <Button
                onClick={() => getBookData(book.sno)}
                variant="contained"
                color="success"
                startIcon={<AutoStoriesIcon />}
              >
                View Book
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FavoriteBooks;
