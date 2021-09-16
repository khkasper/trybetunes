import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleChange = () => {
    const { song } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(song);
      this.setState({
        loading: false,
        checked: true,
      });
    });
  }

  handleChange = ({ target: checked }) => {
    const { song } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      addSong(song).then(() => {
        this.setState({ loading: false, checked: true });
      });
    } else {
      removeSong(song).then(() => {
        this.setState({ loading: false, checked: false });
      });
    }
  }

  render() {
    const { loading, checked } = this.state;
    const { song: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { loading ? <Loading /> : <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          id={ trackId }
          value={ trackId }
          checked={ checked }
          onChange={ this.handleChange }
        /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
