import React, { Component } from 'react';
import Loading from '../pages/Loading';
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
        <p data-testid="header-user-name">
          { name }
        </p>
      </header>
    );
  }
}
