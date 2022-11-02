import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchfromAPI } from "../utils/api";
import Videos from "../components/Videos";
import Loading from "../components/Loading";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchfromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))
      .catch((error) => console.log(error));
    fetchfromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.log(error));
  }, [id]);
  if (!videoDetail?.snippet) return <Loading />;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ sm: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "30px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="white" variant="h5" fontWeight="bold" p={2}>
              {videoDetail.snippet.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "white" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                <Typography
                  sx={{ typography: { sm: "subtitle1", md: "h6" } }}
                  color="white"
                >
                  {videoDetail.snippet.channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction={{ sm: "row", md: "column" }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
