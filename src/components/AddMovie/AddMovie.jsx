import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AddMovie.css'

function AddMovie() {

    const history = useHistory()
    const dispatch = useDispatch()

    let [hidden, setHidden] = useState(true)

    const [movieData, setMovieData] = useState({ title: '', poster: '', description: '', genre_id: '' })

    const [genre_id, setGenre_id] = useState('')

    const demoPoster = (id, genre) => {
        setMovieData({ ...movieData, genre_id: id })
        setGenre_id(genre)
        setHidden(!hidden)
    }

    const handleSubmit = () => {
        console.log(movieData)
        dispatch({
            type: 'ADD_MOVIE',
            payload: movieData
        })
        history.push('/')
    }

    return (
        <>
            <h3>Add A new movie</h3>
            <input value={movieData.title} onChange={(event) => setMovieData({ ...movieData, title: event.target.value })} type="text" placeholder="Movie Title" />
            <input value={movieData.poster} onChange={(event) => setMovieData({ ...movieData, poster: event.target.value })} type="url" placeholder="Movie Poster url" />
            <input value={movieData.description} onChange={(event) => setMovieData({ ...movieData, description: event.target.value })} type="text" placeholder="Movie Description" />
            <div className="dropdown">
                <button >Movie Genres</button>
                <div className="dropdown-content">
                    <a onClick={() => demoPoster(1, 'Adventure')} >Adventure</a>
                    <a onClick={() => demoPoster(2, 'Animated')} >Animated</a>
                    <a onClick={() => demoPoster(3, 'Biographical')} >Biographical</a>
                    <a onClick={() => demoPoster(4, 'Comedy')} >Comedy</a>
                    <a onClick={() => demoPoster(5, 'Disaster')} >Disaster</a>
                    <a onClick={() => demoPoster(6, 'Drama')} >Drama</a>
                    <a onClick={() => demoPoster(7, 'Epic')} >Epic</a>
                    <a onClick={() => demoPoster(8, 'Fantasy')} >Fantasy</a>
                    <a onClick={() => demoPoster(9, 'Musical')} >Musical</a>
                    <a onClick={() => demoPoster(10, 'Romantic')} >Romantic</a>
                    <a onClick={() => demoPoster(11, 'Science')} >Science Fiction</a>
                    <a onClick={() => demoPoster(12, 'Space')} >Space-Opera</a>
                    <a onClick={() => demoPoster(13, 'Superhero')} >Superhero</a>
                </div>
            </div>
            <div>
                <button onClick={() => history.push('/')}>Cancel</button>
                <button onClick={() => handleSubmit()}>Save</button>
            </div>
            {!hidden &&
                <div>
                    <div className="card">
                        <div>
                            <div className="card-title">{movieData.title}</div>
                            <img className="card-img-top" src={movieData.poster} />
                            <div className="card-body">{movieData.description}</div>
                        </div>
                        <div>
                            <h5>Movie Genres:</h5>
                            <div className="card-text">{genre_id}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AddMovie