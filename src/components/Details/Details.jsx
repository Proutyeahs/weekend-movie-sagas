import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './Details.css'

function Details() {

    // loads the movie details on page refresh
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
        dispatch({
            type: 'GET_GENRES',
            payload: id
        })
    }

    const dispatch = useDispatch()
    const history = useHistory();

    const details = useSelector(store => store.details);
    const genres = useSelector(store => store.genres);

    console.log(details, genres)
    return (
        <>
            <div className="card">
                {details.map(detail => (
                    <div key={detail.title}>
                        <div className="card-title">{detail.title}</div>
                        <img className="card-img-top" src={detail.poster} />
                        <div className="card-body">{detail.description}</div>
                    </div>
                ))}
                <h5>Movie Genres:</h5>
                {genres.map(genre => (
                    <div key={genre.name}>
                        <div className="card-text">{genre.name}</div>
                    </div>
                ))}
                {/* incomplete */}
                <div>
                    <button className="hover" onClick={() => history.push(`/editgenre/${id}`)}>Add/Remove Genre</button>
                </div>
                <button className="hover" onClick={() => history.push(`/editmovie/${id}`)}>Edit Movie</button>
                <button className="hover" onClick={() => history.push('/')}>Back</button>
            </div>
        </>
    )
}

export default Details