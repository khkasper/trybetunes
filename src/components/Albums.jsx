import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Albums extends Component {
  render() {
    const { artist, albums } = this.props;
    if (!albums.length) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
    return (
      <div>
        <p>{ `Resultado de álbuns de: ${artist} `}</p>
        { albums.map(({
          artistName,
          collectionId,
          collectionName,
          artworkUrl100,
        }) => (
          <div key={ collectionName }>
            <p>{ artistName }</p>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{ collectionName }</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};
