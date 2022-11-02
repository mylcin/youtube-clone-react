import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Videos from "../components/Videos";
import ChannelCard from "../components/ChannelCard";
import { fetchfromAPI } from "../utils/api";
const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchfromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))
      .catch((error) => console.log(error));
    fetchfromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`)
      .then((data) => setVideos(data?.items))
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <Box
          sx={{
            height: {xs: "200px", md: "300px"},
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-120px" />
      </Box>
      <Box display="flex" p={2}>
        <Videos videos={videos} direction={{ sm: "row" }} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
