import React from 'react';
import './DisplayMovie.css';

const DisplayMovie = (props) => {

    console.log("Teste no display" + props.movies)

    if (props.movies.length > 1) {
        props.movies.sort((a, b) => (a.Title > b.Ttile) ? 1 : 0)
    }

    const movies = props.movies.map((movie, index) => {
        return (
            <div key={index} className='movie_container'>
                <div className='movie_elements'>
                    <h1 > {movie.Title} </h1>
                        <p> {movie.Plot}</p>
                        <p> Year:  {movie.Year}</p>
                        <p> Runtime:  {movie.Runtime}</p>
                    <img src={movie.Poster} alt='Movie representational poster' />
                </div>
            </div>
        );
    });

    return (
        <div>
            {movies}
        </div>
    )
}

export default DisplayMovie
