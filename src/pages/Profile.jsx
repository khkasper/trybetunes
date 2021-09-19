import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  }

  render() {
    const { user: { description, email, image, name }, loading } = this.state;
    if (loading) {
      return (
        <div data-testid="page-profile">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <main>
          <img
            data-testid="profile-image"
            alt={ name }
            src={ image }
          />
          <Link to="/profile/edit">
            Editar perfil
          </Link>
          <p>Nome</p>
          <p>{ name }</p>
          <p>E-mail</p>
          <p>{ email }</p>
          <p>Descrição</p>
          <p>{ description }</p>
        </main>
      </div>
    );
  }
}
