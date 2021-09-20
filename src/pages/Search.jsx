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
      albums: null,
      artist: '',
      loading: false,
      search: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { search } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(search);
      this.setState((prevState) => ({
        albums,
        artist: prevState.search,
        loading: false,
        search: '',
      }));
    });
  }

  render() {
    const { albums, artist, loading, search } = this.state;
    if (loading) {
      return (
        <div data-testid="page-search">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            value={ search }
            placeholder="Nome do artista ou banda"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ search.length < MIN_LENGTH }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        { albums && <Albums artist={ artist } albums={ albums } /> }
      </div>
    );
  }
}
