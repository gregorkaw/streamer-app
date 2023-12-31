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
    fetch(`http://localhost:8000/streamer/${streamerId}/vote`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voteType }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data or perform any necessary actions
        console.log(data);
        fetchStreamers();
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <div className="h-[100vh] text-xl text-white text-center flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-white text-3xl font-bold mb-6">Streamers:</h1>
      {streamers.length === 0 ? (
        <div>No streamers found.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {streamers.map((streamer) => (
            <li
              key={streamer.id}
              className="bg-black shadow-sm shadow-gray-900 rounded-xl p-4 hover:scale-105 transition duration-300"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  className="hover:opacity-50 w-40 h-40 object-cover rounded cursor-pointer transition duration-300"
                  src={streamer.photo}
                  alt={streamer.name}
                  onClick={() => handleStreamerClick(streamer.id)}
                />
                <h3 className="text-white text-xl font-semibold my-2">{streamer.name}</h3>
                <h3 className="text-lg font-semibold mb-2 bg-white p-1 rounded-xl w-24 flex items-center justify-center">
                  {streamer.platform}
                </h3>
                <div className="text-white 2xl:flex justify-between items-center gap-6 mt-2">
                  <div>
                    <span
                      onClick={() => {
                        handleVote(streamer.id, "upvote");
                      }}
                      className="mr-2 cursor-pointer"
                    >
                      <strong>👍: </strong>
                      {streamer.upvotes}
                    </span>
                    <span
                      onClick={() => {
                        handleVote(streamer.id, "downvote");
                      }}
                      className="cursor-pointer"
                    >
                      <strong>👎: </strong>
                      {streamer.downvotes}
                    </span>
                  </div>

                  <button
                    className="bg-white text-black px-4 p-2 rounded-xl mt-2 2xl:mt-0 font-bold hover:scale-105 transition duration-300"
                    onClick={() => handleStreamerClick(streamer.id)}
                  >
                    Go to page -{">"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreamersList;
