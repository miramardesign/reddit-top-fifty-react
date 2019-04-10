import React from 'react';
import './RedditDesc.scss';

class RedditDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isLoaded: false,
    };

  }

  componentWillMount = () => {
    console.log('RedditDesc will mount');
  }
  componentDidMount = () => {
    console.log('RedditDesc mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('RedditDesc will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('RedditDesc will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('RedditDesc did update');
  }

  componentWillUnmount = () => {
    console.log('RedditDesc will unmount');
  }

  render() {
    const { error } = this.state;
    const item = this.props.item;

    console.log(this.state, "state passed to desc");
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!item) {
      return <div>Loading...</div>;
    } else {
      return (
     
        <div className="container" >
        {item.data.id}
          <div className="row" >
            <div className="offset-md-1 col-md-10">
              <h1>{item.data.author}</h1>
            </div>
          </div>
          <div className="row mt-1">

            <div className="offset-md-3 col-md-6">

              <img src={item.data.thumbnail}
                alt={item.data.title} />
            </div>

          </div>
          <div className="row mt-1">

            <div className="offset-md-1 col-md-10">
              <h5>{item.data.title}</h5>
            </div>
          </div>

        </div>

      );
    }
  }
}

export default RedditDesc;
