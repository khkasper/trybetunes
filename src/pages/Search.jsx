import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_LENGTH = 2;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      artist: value,
    });
  }

  handleClick = () => {
    console.log('.');
  }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist"
              value={ artist }
              placeholder="Nome do artista ou banda"
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ artist.length < MIN_LENGTH }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
