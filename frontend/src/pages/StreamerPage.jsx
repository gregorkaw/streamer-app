import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StreamerPage = () => {
  const { id } = useParams();
  const [streamer, setStreamer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/streamers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStreamer(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [streamer]);

  const handleVote = (streamerId, voteType) => {
    fetch(`http://localhost:8000/streamer/${streamerId}/vote`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voteType }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data or perform any necessary actions
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!streamer) {
    return <div>Streamer not found.</div>;
  }

  return (
    <div className="p-4 bg-zinc-950 h-[100vh]">
      <div className="w-full flex flex-col justify-center items-center mt-12"> 
        <h1 className="text-white text-3xl font-bold mb-6">{streamer.name}</h1>
        <h3 className="text-lg font-semibold mb-2 bg-white p-2 rounded w-24 flex items-center justify-center">
        {streamer.platform}
        </h3>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <img
          className="w-160 h-160 object-cover rounded"
          src={streamer.photo}
          alt={streamer.name}
        />
      </div>
      <div className="text-white text-lg mb-4 mx-12">{streamer.description}</div>
      <div className="text-gray-500 flex justify-center">
        <span className="mr-4 cursor-pointer"
          onClick={() => {
            handleVote(streamer.id, "upvote");
          }}
          
        >
          <strong>Upvotes: </strong>
          {streamer.upvotes}
        </span>
        <span className="cursor-pointer"
          onClick={() => {
            handleVote(streamer.id, "downvote");
          }}
        >
          <strong>Downvotes: </strong>
          {streamer.downvotes}
        </span>
      </div>
    </div>
  );
};

export default StreamerPage;
