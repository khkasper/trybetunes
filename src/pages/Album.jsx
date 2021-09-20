import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      songs: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchFavorites();
  }

  handleFavorite = ({ target }, song) => {
    const funcUpdate = target.checked ? addSong : removeSong;
    this.setState({ loading: true }, async () => {
      await funcUpdate(song);
      await this.fetchFavorites();
      this.setState({ loading: false });
    });
  }

  fetchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      loading: false,
      songs,
    });
  }

  fetchFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favorites: favorite });
  }

  render() {
    const { loading, songs, favorites } = this.state;
    if (loading) {
      return (
        <div data-testid="page-album">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img
            src={ songs[0].artworkUrl100 }
            alt={ songs[0].artistName }
          />
          <h5 data-testid="artist-name">
            { songs[0].artistName }
          </h5>
          <h5 data-testid="album-name">
            { songs[0].collectionName }
          </h5>
        </div>
        <div>
          { songs.slice(1).map((song, key) => (<MusicCard
            key={ key }
            song={ song }
            onChange={ this.handleFavorite }
            checked={ favorites.some((music) => music.trackId === song.trackId) }
          />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
