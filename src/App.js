import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelDetail from "./pages/ChannelDetail";
import Feed from "./pages/Feed";
import SearchFeed from "./pages/SearchFeed";
import VideoDetail from "./pages/VideoDetail";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </Box>
  );
};

export default App;
