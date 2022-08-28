import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './EditMovie.css'

function EditMovie() {

    useEffect(() => {
        reload(id)
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
    }

    const dispatch = useDispatch()
    const history = useHistory();

    const details = useSelector(store => store.details);
    const genres = useSelector(store => store.genres);

    const [movieData, setMovieData] = useState({id: id, title: ''/*, poster: ''*/, description: ''/*, genre_id: '' */})

    const update = () => {
        
        dispatch({
            type: 'UPDATE',
            payload: movieData
        })
        history.push(`/details/${id}`)
    }

    return (
        <>
            <div className="card">
                {details.map(detail => (
                    <div key={detail.title}>
                        <p>Movie Title:</p>
                        <input className="card-title" placeholder={detail.title} value={movieData.title} onChange={(event) => setMovieData({ ...movieData, title: event.target.value })}/>
                        {/* <p>Movie Poster:</p>
                        <input className="card-img-top" placeholder={detail.poster} value={movieData.poster} onChange={(event) => setMovieData({ ...movieData, poster: event.target.value })}/> */}
                        <p>Movie Description:</p>
                        <input className="card-body" placeholder={detail.description} value={movieData.description} onChange={(event) => setMovieData({ ...movieData, description: event.target.value })}/>
                    </div>
                ))}
                {genres.map(genre => (
                    <div key={genre.name}>
                        {/* <p>Movie Genres:</p>
                        <input className="card-text" placeholder={genre.name} value={movieData.genre_id} onChange={(event) => setMovieData({ ...movieData, genre_id: event.target.value })}/> */}
                    </div>
                ))}
                <button onClick={() => history.push('/')}>Cancel</button>
                <button onClick={() => update()}>Save</button>
            </div>

            {/* Previous Card */}
            <div className="card">
                {details.map(detail => (
                    <div key={detail.title}>
                        <div className="card-title">{detail.title}</div>
                        <img className="card-img-top" src={detail.poster} />
                        <div className="card-body">{detail.description}</div>
                    </div>
                ))}
                {genres.map(genre => (
                    <div key={genre.name}>
                        <h5>Movie Genres:</h5>
                        <div className="card-text">{genre.name}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default EditMovie