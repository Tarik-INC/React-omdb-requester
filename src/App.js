
import React, { Component } from 'react';
import axios from 'axios';
import DisplayMovie from './Components/DisplayMovie';
import './App.css';
class App extends Component {

  state = {
    error: null,
    foundMovies: true,
    searchMovie: '',
    moviesFound: [],
  }

  handleClick = () => {
    axios.get('http://www.omdbapi.com/?apikey=8ccc7bb7&type=movie&s='.concat(this.state.searchMovie))
      .then(response => {
        if (response.data.Response === 'False') {
          this.setState((state) => {
            return {
              ...state,
              foundMovies: false,
              moviesFound: [],
            }
          });
        }
        else {
        
          // let movies = []
          // for(let movie_data in response.data) {
          //   movies.push(resposne.data[1])
          // }
          this.setState((state) => {
            return {
              ...state,
              foundMovies: true,
              moviesFound: response.data.Search,
            }
          });
        }
      })

      .catch(err => {
        this.setState({
          error: err
        })
      })
  }

  handleInput = (event) => {
    // console.log(event.target.value);
    const movieName = event.target.value;
    this.setState(() => {
      return {
        ...this.state,
        searchMovie: movieName
      }
    })
  }

  render() {

    let searchResult;

    if (this.state.error) {
      searchResult = (
        <div>
          Oops : {this.state.error.message}
        </div>
      );
    }
    else if (this.state.foundMovies) {
      searchResult = <DisplayMovie movies={this.state.moviesFound} movieName={this.state.movieName} movieYear={this.state.movieYear} />;
    }
    else {
      searchResult = (
        <div className='movie_not_found'>
          I Didn't found any movie
        <img src={require('./Images/please_god_no.gif')} alt='please god no' className='gif'></img>
        </div>
      );
    }

    return (
      <div>
        <div className='container'>
          <label style={{fontWeight: 'bold', fontSize: '16px'}}>
            Search by movie name:
          <input style={{marginLeft: '10px', borderRadius: '5px', border: '2px solid grey, fontSize: 24px, fontFamily: monospace, height: 48px' }} placeholder='type here!' type='text' value={this.state.searchMovie} onChange={this.handleInput} />
          </label>
          <button className='button' onClick={this.handleClick}>Search!</button>
        </div>
        <div>
          {searchResult}
        </div>
      </div>
    )
  }
}
export default App