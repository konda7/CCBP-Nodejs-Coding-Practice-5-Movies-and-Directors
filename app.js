const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

const express = require("express");
const app = express();

let db = null;
const initializeDbANdServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Error is ${e.message}`);
    process.exit(1);
  }
};

initializeDbANdServer();

//API 1

app.get("/movies/", async (request, response) => {
  const getMovieNamesQuery = `
        SELECT movie_name
        FROM movie
    `;

  const initialMovieNamesArray = await db.all(getMovieNamesQuery);

  const movieNamesArray = initialMovieNamesArray.map((eachMovie) => ({
    movieName: eachMovie.movie_name,
  }));

  response.send(movieNamesArray);
});

//API 2

app.post("/movies/", async (request, response) => {
  console.log(request.body);
  //   const newMovieDetails = request.body;
  //   const { directorId, movieName, leadActor } = newMovieDetails;

  //   console.log(directorId, movieName, leadActor);
});

module.exports = app;
