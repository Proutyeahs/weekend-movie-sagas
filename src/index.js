import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('UPDATE', updateMovie)
    yield takeEvery('DELETE', deleteMovie)
    yield takeEvery('GET_ALL_GENRES', getAllGenres)
    yield takeEvery('DELETE_GENRE', deleteGenre)
    yield takeEvery('ADD_GENRE', addGenre)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

// Updates the values for a movie
function* updateMovie(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload)
        yield put({type: 'SET_DETAILS'}, {type: 'SET_GENRES'})
    } catch {
        console.log('update movie error');
    }
}

// deletes an entire movie entry
function* deleteMovie(action) {
    console.log(action.payload)
    try{
        yield axios.delete(`/api/movie/${action.payload}`)
        yield put({type: 'FETCH_MOVIES'})
    } catch {
        console.log('delete movie error');
    }
}

// start of delete specific Genre
function* deleteGenre(action) {
    console.log(action.payload)
    try{
        yield axios.delete(`/api/genre/${action.payload.id}`, action.payload.name)
        yield put({type: 'GET_DETAILS'})
    } catch {
        console.log('delete genre error');
    }
}

// adds a new movie to the DB
function* addMovie(action) {
    console.log(action.payload)
    try{
        yield axios.post('/api/movie', action.payload)
        yield put({type: 'FETCH_MOVIES'})
    } catch {
        console.log('add movie error');
    }
}

// Post a new genre to the database
function* addGenre(action) {
    console.log(action.payload)
    try{
        yield axios.post('/api/genre', action.payload)
        yield put({type: 'SET_GENRES'})
    } catch {
        console.log('add genre error');
    }
}

function* getDetails(action) {
    // get details for the specific movie from the DB
    console.log(action.payload)
    try {
        const details = yield axios.get(`/api/movie/${action.payload}`);
        console.log(details.data)
        yield put ({type: 'SET_DETAILS', payload: details.data})
    } catch {
        console.log('get details error');
    }
}

function* getGenres(action) {
    // get genres for the specific movie from the DB
    console.log(action.payload)
    try {
        const genres = yield axios.get(`/api/genre/${action.payload}`);
        console.log(genres.data)
        yield put ({type: 'SET_GENRES', payload: genres.data})
    } catch {
        console.log('get genres error');
    }
}

function* getAllGenres(action) {
    console.log(action.payload)
    try{
        const allGenres = yield axios.get('/api/genre')
        console.log(allGenres.data)
        yield put({type: 'SET_ALL_GENRES', payload: allGenres.data})
    } catch {
        console.log('get all genres error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store details returned from the server
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// stores all the genres
const allGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return action.payload;
        default:
            return state
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        allGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
