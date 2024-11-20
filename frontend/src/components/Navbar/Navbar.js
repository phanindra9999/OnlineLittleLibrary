import React, { useState } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/lllogo.jpeg";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { useSnackbar } from "notistack";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const activeStyle = { fontWeight: "bold" };

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(sessionStorage.getItem("username") || "");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/Login");
    window.location.reload();
    enqueueSnackbar("Logged out successfully", { variant: "success" });
  };

  const handleChange = (event) => {
    const val = event.target.value;

    if (val === "Logout") {
      handleLogout();
    } else {
      setValue(val);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logoImage} alt="Little Library Logo" className="logo" />
      </div>

      <div className="nav-links">
        <NavLink to="/Home" activestyle={activeStyle}>
          Home
        </NavLink>
        <NavLink to="/LittleLibrary" activestyle={activeStyle}>
          Little Library
        </NavLink>
        <NavLink to="/Browse" activestyle={activeStyle}>
          Google Books
        </NavLink>
        <NavLink to="/Favorites" activestyle={activeStyle}>
          Favorites
        </NavLink>
        <NavLink to="/requestbook" activestyle={activeStyle}>
          Request Book
        </NavLink>
        <NavLink to="/Account" activestyle={activeStyle}>
          Account
        </NavLink>
      </div>

      <div className="login">
        <FormControl className={classes.formControl}>
          <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{
              anchorOrigin: { horizontal: "right", vertical: "bottom" },
              transformOrigin: { horizontal: "right", vertical: "top" },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value={sessionStorage.getItem("username")}>
              <em>{sessionStorage.getItem("username")}</em>
            </MenuItem>
            <MenuItem value="Logout">Logout</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  );
};

export default Navbar;
