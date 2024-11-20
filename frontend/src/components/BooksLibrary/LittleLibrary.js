// LittleLibrary.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Button,
  ButtonGroup,
  CardContent,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LittleLibrary = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  const [bookData, setBookData] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/books");
      const data = await response.json();
      setBooks(data);
      const uniqueGenres = [...new Set(data.map((book) => book.genre))];
      setGenres(uniqueGenres);
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

  const handleAddToFavorites = async (sno) => {
    const response = await fetch("http://localhost:4000/user/addFavorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: sessionStorage.getItem("username"),
        sno: sno,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      enqueueSnackbar(data.message, { variant: "success" });
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    getBooks();
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
        <TextField
          label="Search by Book Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <MenuItem value="All">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem value={genre}>{genre}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        m={1}
      >
        {books
          .filter((book) => {
            if (selectedGenre !== "All" && book.genre !== selectedGenre) {
              return false;
            }
            return book.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((book, index) => (
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
                  onClick={() => handleAddToFavorites(book.sno)}
                  variant="outlined"
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                >
                  Add to Favorites
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

export default LittleLibrary;
