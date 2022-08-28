const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// start of delete specific genre from database
router.delete('/:id', (req, res) => {
  console.log(req.params, req.body)
})

// start of add new genre for a movie to the database
router.post('/', (req, res) => {
  console.log(req.body)
})

// gets all the genres and movie ids from the DB
router.get('/', (req, res) => {
  console.log(req.body)
  const queryText =`
    SELECT "movies_genres".movie_id, "genres".name FROM "movies_genres"
    JOIN "genres"
    ON "movies_genres".genre_id = "genres".id;`
    pool.query(queryText).then(result => {
      res.send(result.rows)
    }).catch(err => {
      console.log('err in get genres', err)
      res.sendStatus(500)
    })
  // Add query to get all genres
  //res.sendStatus(500)
});

// gets a specific movies genres
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  const query = `
    SELECT name FROM movies
    JOIN movies_genres
    ON "movies".id = "movies_genres".movie_id
    JOIN genres
    ON "movies_genres".genre_id = "genres".id
    WHERE movies.id = $1;`;
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get specific movie geners ', err);
      res.sendStatus(500)
    })
});

module.exports = router;