import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name, image, email, description } = await getUser();
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { name, email, description, image } = this.state;
    const user = { name, email, description, image };
    this.setState({ loading: true }, async () => {
      await updateUser(user);
      this.setState({ redirect: true });
    });
  };

  render() {
    const { description, email, image, name, loading, redirect } = this.state;
    const validate = name && email && description && image;
    if (redirect) return <Redirect to="/profile" />;
    if (loading) {
      return (
        <div data-testid="page-profile-edit">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          <p>Nome</p>
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <p>Email</p>
          <input
            data-testid="edit-input-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <p>Descrição</p>
          <input
            data-testid="edit-input-description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <p>Foto</p>
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            value={ image }
            onChange={ this.handleChange }
          />
          <button
            data-testid="edit-button-save"
            type="button"
            onClick={ this.handleClick }
            disabled={ !validate }
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }
}
