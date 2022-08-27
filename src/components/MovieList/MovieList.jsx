import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './MovieList.css'

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const details = (id) => {
        console.log(id)
        dispatch({
            type : 'GET_DETAILS',
            payload: id
        })
        history.push('/details')
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={() => history.push('/AddMovie')}>Add A Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className="card" key={movie.id} >
                            <h3 className="card-title">{movie.title}</h3>
                            {/* on click go to /details, get the data about the specific poster and display that */}
                            <img className="card-img-top" onClick={() => details(movie.id)} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;