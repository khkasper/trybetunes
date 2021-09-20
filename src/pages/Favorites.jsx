import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = (_, song) => {
    this.setState({ loading: true }, async () => {
      await removeSong(song);
      const favorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        favorites,
      });
    });
  };

  fetchFavorites = () => {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        favorites,
      });
    });
  }

  render() {
    const { loading, favorites } = this.state;
    if (loading) {
      return (
        <div data-testid="page-favorites">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        { favorites.map((song, key) => (
          (<MusicCard
            checked
            key={ key }
            song={ song }
            onChange={ this.handleChange }
          />)
        ))}
      </div>
    );
  }
}
