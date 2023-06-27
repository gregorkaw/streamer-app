import React, { useState } from 'react';

const AddStreamerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo: '',
    platform: 'Twitch',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };
    
      fetch('http://localhost:8000/streamers', requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error adding streamer');
          }
          return response.json();
        })
        .then((data) => {
          // Handle success response here
          console.log('Streamer added successfully:', data);
          // Reset the form data
          setFormData({
            name: '',
            description: '',
            photo: '',
            platform: 'Twitch',
          });
        })
        .catch((error) => {
          // Handle error response here
          console.error('Error adding streamer:', error);
        });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Streamer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block font-semibold mb-2">
            Photo URL
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="platform" className="block font-semibold mb-2">
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Streamer
        </button>
      </form>
    </div>
  );
};

export default AddStreamerForm;
