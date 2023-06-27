import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleVote } from "../api/api";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!streamer) {
    return <div>Streamer not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{streamer.name}</h1>
      <h1 className="text-3xl font-bold mb-6">Platform: {streamer.platform}</h1>
      <div className="flex items-center justify-center mb-6">
        <img
          className="w-40 h-40 object-cover rounded"
          src={streamer.photo}
          alt={streamer.name}
        />
      </div>
      <div className="text-lg mb-4">{streamer.description}</div>
      <div className="text-gray-500">
        <span className="mr-4">
          <strong
            onClick={() => {
              handleVote(streamer.id, "upvote");
            }}
          >
            Upvotes:
          </strong>
          {streamer.upvotes}
        </span>
        <span>
          <strong
            onClick={() => {
              handleVote(streamer.id, "downvote");
            }}
          >
            Downvotes:
          </strong>
          {streamer.downvotes}
        </span>
      </div>
    </div>
  );
};

export default StreamerPage;
