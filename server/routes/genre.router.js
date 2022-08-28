const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  res.sendStatus(500)
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