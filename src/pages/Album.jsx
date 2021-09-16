import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      songs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((songs) => this.setState({
      loading: false,
      songs,
    }));
  }

  render() {
    const { loading, songs } = this.state;
    if (loading) return <Loading />;
    return (
      <main data-testid="page-album">
        <Header />
        <div>
          <div>
            <img
              src={ songs[0].artworkUrl100 }
              alt={ songs[0].artistName }
            />
          </div>
          <h5 data-testid="artist-name">
            { songs[0].artistName }
          </h5>
          <h5 data-testid="album-name">
            { songs[0].collectionName }
          </h5>
        </div>
        <div>
          { songs.slice(1)
            .map(({ trackName, previewUrl }, key) => (<MusicCard
              key={ key }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />))}
        </div>
      </main>
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
