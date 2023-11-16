import React from "react";
import StreamersList from "../components/StreamersList";
import AddStreamerForm from "../components/AddStreamerForm";

const MainPage = () => {
  return (
    <div className="bg-zinc-800">
      <div className="flex justify-center "><AddStreamerForm /></div>
      <StreamersList />
    </div>
  );
};

export default MainPage;
