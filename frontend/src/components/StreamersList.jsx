import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StreamersList = () => {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = () => {
    fetch("http://localhost:8000/streamers")
      .then((response) => response.json())
      .then((data) => {
        setStreamers(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleStreamerClick = (streamerId) => {
    navigate(`/streamer/${streamerId}`);
  };

  const handleVote = (streamerId, voteType) => {
    const votedStreamers =
      JSON.parse(localStorage.getItem("votedStreamers")) || [];

    if (votedStreamers.includes(streamerId)) {
      // User has already voted for this streamer, so we'll remove their vote
      const oppositeVoteType = voteType === "upvote" ? "upvote" : "downvote";

      fetch(`http://localhost:8000/streamer/${streamerId}/removevote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType: oppositeVoteType }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the local storage and re-fetch the streamers
          const updatedVotedStreamers = votedStreamers.filter(
            (id) => id !== streamerId
          );
          localStorage.setItem(
            "votedStreamers",
            JSON.stringify(updatedVotedStreamers)
          );
          fetchStreamers();
        })
        .catch((error) => console.error(error));
    } else {
      // User hasn't voted for this streamer, so we'll add their vote
      fetch(`http://localhost:8000/streamer/${streamerId}/${voteType}`, {
        method: "PUT",
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the local storage and re-fetch the streamers
          const updatedVotedStreamers = votedStreamers.filter(
            (id) => id !== streamerId
          );
          updatedVotedStreamers.push(streamerId);
          localStorage.setItem(
            "votedStreamers",
            JSON.stringify(updatedVotedStreamers)
          );
          fetchStreamers();
        })
        .catch((error) => console.error(error));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Streamers List</h1>
      {streamers.length === 0 ? (
        <div>No streamers found.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {streamers.map((streamer) => (
            <li key={streamer.id} className="bg-white shadow rounded p-4">
              <img
                className="w-40 h-40 object-cover rounded cursor-pointer"
                src={streamer.photo}
                alt={streamer.name}
                onClick={() => handleStreamerClick(streamer.id)}
              />
              <h3 className="text-lg font-semibold mb-2">{streamer.name}</h3>
              <h3 className="text-lg font-semibold mb-2">
                {streamer.platform}
              </h3>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreamersList;
