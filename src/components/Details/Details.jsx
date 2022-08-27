import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './Details.css'

function Details() {

    const history = useHistory();

    const details = useSelector(store => store.details);
    const genres = useSelector(store => store.genres);

    console.log(details, genres)
    return (
        <>
        <div className="card">
            {details.map(detail => (
                <div>
                    <div className="card-title">{detail.title}</div>
                    <img className="card-img-top" src={detail.poster} />
                    <div className="card-body">{detail.description}</div>
                </div>
            ))}
            {genres.map(genre => (
                <div>
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