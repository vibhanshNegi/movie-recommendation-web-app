Movie Recommender App

A simple full-stack web application that recommends movies based on user input keywords.  
The app uses the **OMDb API** to fetch real movie data and displays the top 5 recommendations with details like title, year, genre, rating, poster, and plot.

 Features

- Search movies by keyword (action, romance, batman, etc.)
- Shows top 5 recommended movies with poster, genre, rating, and plot
- Full-stack architecture: Node.js backend + HTML/CSS/JS frontend
- Responsive and clean user interface
- Easy to run locally or deploy online

Folder Structure

movie-recommender/
├── backend/
│ ├── index.js
│ └── package.json
└── frontend/
└── index.html

 Instructions to Run Locally

1. Clone the repository:
git clone <https://github.com/vibhanshNegi/movie-recommendation-web-app.git>
Navigate to backend folder and install dependencies:

cd movie-recommender/backend
npm install
Add your OMDb API key in index.js:

const OMDB_API_KEY = "YOUR_OMDB_API_KEY_HERE";
Start the backend server:

node index.js
Open the frontend in your browser:

cd frontend
open index.html
Enter a keyword (e.g., action) and click Recommend.
Top 5 movies will be displayed.

Deployed link (only for showing front end)
https://movie-recommendation-web-app-oh1v.vercel.app/
