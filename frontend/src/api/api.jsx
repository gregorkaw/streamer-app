export const handleVote = (streamerId, voteType) => {
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