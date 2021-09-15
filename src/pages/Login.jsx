import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

const MIN_LENGTH = 3;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <Header />
        <form>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="login-name-input"
              name="name"
              value={ name }
              placeholder="Nome"
              onChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ name.length < MIN_LENGTH }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
