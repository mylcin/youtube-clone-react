import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
        p: 2,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo.png" height="45px" />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
