import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './EditMovie.css'

function EditMovie() {

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
    }

    const dispatch = useDispatch()
    const history = useHistory();

    const details = useSelector(store => store.details);
    // const genres = useSelector(store => store.genres);

    const [movieData, setMovieData] = useState({ title: ''/*, poster: ''*/, description: '', genre_id: '', id: id })
    const [genre_id, setGenre_id] = useState('')

    // dispalys the updated values before saving it to the DB
    const editGenre = (id, genre) => {
        setMovieData({ ...movieData, genre_id: id })
        setGenre_id(genre)
        setHidden(!hidden)
    }

    let [hidden, setHidden] = useState(true)

    // sends updated movie values to the put request
    const update = () => {
        if (movieData.title == '' || movieData.description == '') {
            return alert('Please make sure all input values are filled out')
        }
        dispatch({
            type: 'UPDATE',
            payload: movieData
        })
        setTimeout(() => { history.push(`/details/${id}`) }, 1000)
    }

    // sends the id to the delete request
    const remove = () => {
        console.log(id)
        dispatch({
            type: 'DELETE',
            payload: id
        })
        history.push('/')
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={() => remove()} className="hover">Delete Entire Entry</button>
                </div>
                <p>or</p>
                <h3>Edit Movie:</h3>
                <input className="card-title" placeholder={'title'} value={movieData.title} onChange={(event) => setMovieData({ ...movieData, title: event.target.value })} />
                <input className="card-body" placeholder={'description'} value={movieData.description} onChange={(event) => setMovieData({ ...movieData, description: event.target.value })} />
                <div className="dropdown">
                    <button >Movie Genres</button>
                    <div className="dropdown-content">
                        <a onClick={() => editGenre(1, 'Adventure')} >Adventure</a>
                        <a onClick={() => editGenre(2, 'Animated')} >Animated</a>
                        <a onClick={() => editGenre(3, 'Biographical')} >Biographical</a>
                        <a onClick={() => editGenre(4, 'Comedy')} >Comedy</a>
                        <a onClick={() => editGenre(5, 'Disaster')} >Disaster</a>
                        <a onClick={() => editGenre(6, 'Drama')} >Drama</a>
                        <a onClick={() => editGenre(7, 'Epic')} >Epic</a>
                        <a onClick={() => editGenre(8, 'Fantasy')} >Fantasy</a>
                        <a onClick={() => editGenre(9, 'Musical')} >Musical</a>
                        <a onClick={() => editGenre(10, 'Romantic')} >Romantic</a>
                        <a onClick={() => editGenre(11, 'Science Fiction')} >Science Fiction</a>
                        <a onClick={() => editGenre(12, 'Space-Opera')} >Space-Opera</a>
                        <a onClick={() => editGenre(13, 'Superhero')} >Superhero</a>
                    </div>
                </div>
                <div>
                    <button className="hover" onClick={() => history.push('/')}>Cancel</button>
                    <button className="hover" onClick={() => update()}>Save</button>
                </div>
            </div>

            {!hidden &&
                <div className="card">
                    <div className="card-title">{movieData.title}</div>
                    {details.map(detail => (
                        <div key={detail.title}>
                            <img className="card-img-top" src={detail.poster} />
                        </div>
                    ))}
                    <div className="card-body">{movieData.description}</div>
                    <h5>Movie Genres:</h5>
                    <div className="card-text">{genre_id}</div>
                </div>
            }
        </>
    )
}

export default EditMovie