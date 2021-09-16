import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Albums from '../components/Albums';

const MIN_LENGTH = 2;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      search: '',
      albums: [],
      loading: false,
      result: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      artist: value,
    });
  }

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      search: artist,
    });
    const albums = await searchAlbumsAPI(artist);
    if (albums) {
      this.setState({
        albums,
        artist: '',
        loading: false,
        result: true,
      });
    }
  }

  render() {
    const { artist, search, albums, loading, result } = this.state;
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
        { loading && <Loading /> }
        { result && <Albums artist={ search } albums={ albums } /> }
      </div>
    );
  }
}
