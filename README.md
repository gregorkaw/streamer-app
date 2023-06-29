# Streamer App

This is a Streamer App that allows users to check, add and upvote or downvote streamers. The app is built using [Node.js](https://nodejs.org) and [Express](https://expressjs.com/) for the backend and [React](https://reactjs.org) for the frontend.

## Installation

To use the Streamer App locally on your computer, follow these steps:

### Prerequisites

- Node.js (version 12 or above)
- Git

### Clone the Repository

1. Open your terminal or command prompt.
2. Change the current working directory to the location where you want to clone the repository.
3. Run the following command to clone the repository:

   ```shell
   git clone (https://github.com/gregorkaw/streamer-app)

### Setting up

1. Change the directory to the cloned repository:
   
   ```shell
   cd streamer-app

2. Change the directory to the backend:
   
   ```shell
   cd backend
   
3. Install the required dependencies:

   ```shell
   npm install

4. Start the backend server:

   ```shell
   npm start

The server will start running on http://localhost:8000.

5. Change the directory to the frontend:

   ```shell
   cd ../
   cd frontend

6. Install the required dependencies:

   ```shell
   npm install

7. Start the React frontend server with:

   ```shell
   npm run dev

8. The frontend application should be accessible at http://localhost:5137(if not the correct URL will be in the command prompt).

   Remember to use separate command windows for both backend and frontend!

### Usage

   1. Open a web browser and visit http://localhost:3000 to access the Streamer App.
   2. Browse the list of streamers and click the "Upvote" or "Downvote" button to vote for a streamer.
   3. You can only upvote or downvote a streamer once. Clicking the button again will remove your vote.
   4. The vote count for each streamer will be updated in real-time.
   5. You can add other streamers using "Add streamer" form
   6. You can access the streamer page by clicking on his/hers photo or button
   7. Feel free to explore the app, add and vote for your favorite streamers!
