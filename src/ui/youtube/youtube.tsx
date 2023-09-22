import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const opts = {
    height: "315",
    width: "360",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
