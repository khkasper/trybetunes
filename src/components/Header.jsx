import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  }

  render() {
    const { user: { name }, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
        <p data-testid="header-user-name">
          { name }
        </p>
      </header>
    );
  }
}
