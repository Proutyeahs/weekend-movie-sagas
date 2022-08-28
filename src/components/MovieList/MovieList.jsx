import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './MovieList.css'

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const allGenres = useSelector(store => store.allGenres);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'GET_ALL_GENRES'})
    }, []);

    // gets the specific movie details when sent to the details page
    const details = (id) => {
        console.log(id)
        dispatch({
            type : 'GET_DETAILS',
            payload: id
        })
        history.push(`/details/${id}`)
    }

    //renders the specifc genres on the dom
    const displayGenres = (id) => {
        let num = 0
        let movieGenres = []
        for(let genre of allGenres) {
            if (id == genre.movie_id) {
                movieGenres.push(<p key={num++}>{genre.name}</p>)
            }
        }
        return movieGenres
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button className="hover" onClick={() => history.push('/AddMovie')}>Add A Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className="card" key={movie.id} >
                            <h3 className="card-title">{movie.title}</h3>
                            {/* on click go to /details, get the data about the specific poster and display that */}
                            <img className="card-img-top" onClick={() => details(movie.id)} src={movie.poster} alt={movie.title}/>
                            <h4>Genres</h4>
                            {displayGenres(movie.id)}
                        </div>
                    );
                })}
                
            </section>
        </main>

    );
}

export default MovieList;