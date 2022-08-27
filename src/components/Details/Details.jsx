import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function Details() {

    const history = useHistory();

    const details = useSelector(store => store.details);
    const genres = useSelector(store => store.genres);

    console.log(details, genres)
    return (
        <>
            {details.map(detail => (
                <div>
                    <p>{detail.title}</p>
                    <img src={detail.poster} />
                    <p>{detail.description}</p>
                </div>
            ))}
            {genres.map(genre => (
                <div>
                    <p>{genre.name}</p>
                </div>
            ))}
            <button onClick={() => history.push('/')}>Back</button>
        </>
    )
}

export default Details