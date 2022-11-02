import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";
import { fetchfromAPI } from "../utils/api";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchfromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => console.log(error));
  }, [selectedCategory]);
  if (!videos) return <Loading />;

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ color: "white", opacity: "0.8", mt: 1 }}
        >
          &copy; React Youtube 2022
        </Typography>
      </Box>
      <Box sx={{ p: 2, overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "white", mb: 2 }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} direction={{ sm: "row" }} />
      </Box>
    </Stack>
  );
};

export default Feed;
