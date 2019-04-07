import React from 'react';
// import PropTypes from 'prop-types';
//import { Test } from './RedditList.styles';
import TimeAgo from 'react-timeago'

class RedditList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,

      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentWillMount = () => {
    console.log('RedditList will mount');
  }

  componentDidMount = () => {
    console.log('RedditList mounted');
    const num = 20;
    const topUrl = `https://www.reddit.com/r/all/top.json?limit=${num}`;
    fetch(topUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('chilidren', result.data.children);
          this.setState({
            isLoaded: true,
            items: result.data.children
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('RedditList will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('RedditList will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('RedditList did update');
  }

  componentWillUnmount = () => {
    console.log('RedditList will unmount');
  }

  epochToDate = (utcSeconds) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d.toLocaleDateString();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.data.title}>
              {item.data.author}
                timeAgo:  <TimeAgo date={item.data.created * 1000 } /> 
               <br />
              {item.data.thumbnail} {item.data.title}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      );
    }
  }
}

RedditList.propTypes = {
  // bla: PropTypes.string,
};

RedditList.defaultProps = {
  // bla: 'test',
};

export default RedditList;
