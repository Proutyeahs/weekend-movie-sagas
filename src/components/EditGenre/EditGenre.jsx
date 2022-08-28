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

    const [newGenre, setNewGenre] = useState({id: id, name : ''})

    // sends the delete genre id to the delete route
    const remove = (name) => {
        console.log(name)
        setNewGenre(newGenre.name = name )
        console.log(newGenre)
        dispatch({type: 'DELETE_GENRE', payload: newGenre})
    }

    return (
        <>
        <button className="hover" onClick={() => history.push(`/details/${id}`)}>Back To Movie Details</button>
        <h3>Remove Genres:</h3>
        {genres.map(genre => {
            return (
                <p key={genre.name}>{genre.name} ~ <button value={newGenre.name} onClick={() => remove(genre.name)} className="hover">Delete</button></p>
            )
        })}
        <h3>Add Genres:</h3>
            <div className="dropdown">
                <button>Movie Genres</button>
                <div className="dropdown-content">
                    {/* sends the id of the genre to the post genre route */}
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 1})} >Adventure</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 2})} >Animated</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 3})} >Biographical</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 4})} >Comedy</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 5})} >Disaster</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 6})} >Drama</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 7})} >Epic</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 8})} >Fantasy</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 9})} >Musical</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 10})} >Romantic</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 11})} >Science Fiction</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 12})} >Space-Opera</a>
                    <a onClick={() => dispatch({type: 'ADD_GENRE', payload: 13})} >Superhero</a>
                </div>
            </div>
        </>
    )
}
export default EditGenre