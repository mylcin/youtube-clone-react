import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Videos from "../components/Videos";
import { fetchfromAPI } from "../utils/api";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchfromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);
  if (!videos) return <Loading />;
  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: "white", mb: 2 }}>
        Search results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} direction={{ sm: "row"}}  />
    </Box>
  );
};

export default SearchFeed;
