import React from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';

// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => {
  return (
  <div>
    {props.profiles.map(profile => <Card {...profile} key={profile.id}/>)}
  </div>
  )
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <>
      <div className="github-profile">
        Github Profile
        <div>
        <img src={profile.avatar_url} alt="#" className="avatar"></img>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
          <div className="createdAt">Profile created at: {moment().format(profile.created_at)}</div>
        </div>
      </div>
      </div>  
      </>
    )
  }
}

class Form extends React.Component {
  state = {
    userName: '',
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = 
    await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(response.data);
    console.log(response.data)
    this.setState({ userName: '' });
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        placeholder="Github username"
        value={this.state.userName}
        onChange={event => this.setState({ userName: event.target.value})}>
        </input>
        <button>Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  }
  render () {
    return (
      <div className="App">
        <div className="header">
          The Github Cards App
        </div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  };
}

export default App;
