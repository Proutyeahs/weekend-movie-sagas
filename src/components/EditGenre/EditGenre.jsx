import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import './EditGenre.css'

function EditGenre() {
    useEffect(() => {
        reload(id)
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_GENRES',
            payload: id
        })
    }

    const dispatch = useDispatch()
    const history = useHistory();

    const genres = useSelector(store => store.genres);

    const [genre_id, setGenre_id] = useState('')

    // dispalys the updated values before saving it to the DB
    const addGenre = (id, genre) => {
        setMovieData({ ...movieData, genre_id: id })
        setGenre_id(genre)
    }

    return (
        <>
        <button className="hover" onClick={() => history.push(`/details/${id}`)}>Back To Movie Details</button>
        <h3>Remove Genres:</h3>
        {genres.map(genre => {
            return (
                <p key={genre.name}>{genre.name} ~ <button onClick={() => dispatch({type: 'DELETE_GENRE', payload: genres})} className="hover">Delete</button></p>
            )
        })}
        <h3>Add Genres:</h3>
            <div className="dropdown">
                <button>Movie Genres</button>
                <div className="dropdown-content">
                    <a onClick={() => addGenre(1, 'Adventure')} >Adventure</a>
                    <a onClick={() => addGenre(2, 'Animated')} >Animated</a>
                    <a onClick={() => addGenre(3, 'Biographical')} >Biographical</a>
                    <a onClick={() => addGenre(4, 'Comedy')} >Comedy</a>
                    <a onClick={() => addGenre(5, 'Disaster')} >Disaster</a>
                    <a onClick={() => addGenre(6, 'Drama')} >Drama</a>
                    <a onClick={() => addGenre(7, 'Epic')} >Epic</a>
                    <a onClick={() => addGenre(8, 'Fantasy')} >Fantasy</a>
                    <a onClick={() => addGenre(9, 'Musical')} >Musical</a>
                    <a onClick={() => addGenre(10, 'Romantic')} >Romantic</a>
                    <a onClick={() => addGenre(11, 'Science Fiction')} >Science Fiction</a>
                    <a onClick={() => addGenre(12, 'Space-Opera')} >Space-Opera</a>
                    <a onClick={() => addGenre(13, 'Superhero')} >Superhero</a>
                </div>
            </div>
        </>
    )
}
export default EditGenre