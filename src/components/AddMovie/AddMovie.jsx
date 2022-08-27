import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './AddMovie.css'

function AddMovie() {

    const history = useHistory()
    const dispatch = useDispatch()

    const [movieData, setMovieData] = useState({ title: '', poster: '', description: '', genre_id: '' })

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
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 1 })} >Adventure</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 2 })} >Animated</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 3 })} >Biographical</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 4 })} >Comedy</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 5 })} >Disaster</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 6 })} >Drama</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 7 })} >Epic</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 8 })} >Fantasy</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 9 })} >Musical</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 10 })} >Romantic</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 11 })} >Science Fiction</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 12 })} >Space-Opera</a>
                    <a onClick={() => setMovieData({ ...movieData, genre_id: 13 })} >Superhero</a>
                </div>
            </div>
            <div>
                <button onClick={() => history.push('/')}>Cancel</button>
                <button onClick={() => handleSubmit()}>Save</button>
            </div>
        </>
    )
}

export default AddMovie