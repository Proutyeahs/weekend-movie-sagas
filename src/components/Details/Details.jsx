import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './Details.css'

function Details() {

    useEffect(() => {
        reload(id)
    }, [])
    let {id} = useParams()
    
    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_DETAILS',
            payload : id
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
            {genres.map(genre => (
                <div key={genre.name}>
                    <h5>Movie Genres:</h5>
                    <div className="card-text">{genre.name}</div>
                </div>
            ))}
            <button onClick={() => history.push('/')}>Back</button>
            </div>
        </>
    )
}

export default Details