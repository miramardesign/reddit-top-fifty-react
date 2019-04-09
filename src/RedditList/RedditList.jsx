import React from 'react';
import './RedditList.scss';

import TimeAgo from 'react-timeago';
 
class RedditList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);

    this.state = {
      hasError: false,

      error: null,
      isLoaded: false,
      redditList: [],
      hiddenList: [],
      visitedList: []
    };

    this.perist = {
      set: (key, value) => {
        console.log('set called todo push to localstorage!!', key, value);
      }

    }
  }

  componentWillMount = () => {
    console.log('RedditList will mount');
  }

  componentDidMount = () => {
    console.log('RedditList mounted');
    const num = 5;
    const topUrl = `https://www.reddit.com/r/all/top.json?limit=${num}`;
    fetch(topUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('chilidren', result.data.children);
          this.setState({
            isLoaded: true,
            redditList: result.data.children
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

  /**
   * click events
   */
  onItemClick = (item, e) => {
    item.data.visited = true;
    e.preventDefault();
    this.forceUpdate();
    this.props.onItemClick(item);

  };

  onDismiss = (item, e) => {
    item.data.hidden = true;
    e.preventDefault();
    this.forceUpdate();
    // this.setState({redditList: this.redditList});
    console.log("item dismiss called", item);
  };


  /**
   * dismiss all listings by adding them all to a list and then pushing to persistence
   */
  onDismissAll = (redditList) => {

    console.log('dismissAll called');
    const { hiddenList } = this.state;

    redditList.forEach(item => {
      const id = item.data.id;
      item.data.hidden = true;
      if (hiddenList.indexOf(id) === -1) {
        hiddenList.push(id);
      }
    });
    this.perist.set('hidden', this.hiddenList);
    this.setState({ redditList: redditList, hiddenList: hiddenList });

    this.forceUpdate();
  }
  /**
   * restore all listings or we cant see them again if persisted
   */
  onRestoreAll() {
    console.log('restoreAll called');
    const { redditList } = this.state;

    redditList.forEach(item => {
      item.data.hidden = false;
    });

    this.setState({ redditList: redditList, hiddenList: [], visitedList: [] });

    //todo get a persist localStorage lib
    this.perist.set('visited', []);
    this.perist.set('hidden', []);

    this.forceUpdate();
  }


  isShown = () => {
    return (this.redditList.length > 0) && (this.hiddenList.length < 49);
  };

  isHidden = () => {
    return this.redditList.length > 0 && this.hiddenList.length > 1
  };

  render() {
    const { error, isLoaded, redditList } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="item-list">
          <h1 className="text-center">Reddit Posts</h1>

          <ul className="list-unstyled">
            {redditList.map(item => (
              <div key={item.data.title}>
                {/* hidden?????? {String(item.data.hidden )} */}
                {/* visited?????? {String(item.data.visited )} */}

                {!item.data.hidden &&
                  <li
                    className="nav-item">
                    {/* [@enterAnimation] */}

                    <div className="row cursor-pointer"
                      onClick={(e) => this.onItemClick(item, e)} >

                      <div className="col-md-10">
                        <span
                          className={"bluebullets " + (item.data.visited ? 'visited' : '')}>

                          &bull;</span>
                        <span className="cursor-pointer"
                        >
                          {item.data.author} <TimeAgo date={item.data.created * 1000} />
                        </span>
                      </div>
                    </div>
                    <div className="row align-items-center cursor-pointer"
                      onClick={(e) => this.onItemClick(item, e)}
                    >
                      <div className="col-md-5 col-sm-5 col-5">

                        <span className="cursor-pointer"
                        >
                          <img src={item.data.thumbnail}
                            alt="item.data.title" />

                        </span>
                      </div>

                      <div className="col-md-5 col-sm-5 col-5 cursor-pointer" >
                        <span className="cursor-pointer" >
                          {item.data.title}
                        </span>
                      </div>
                      <div className="col-md-1 col-sm-1 col-1">

                        <div className="d-table">
                          <span className="d-table-cell align-middle">

                            <i className="material-icons">
                              chevron_right
                            </i>
                          </span>
                        </div>
                      </div>

                    </div>
                    <div className="row">

                      <div className="col-md-5 col-5">
                        <a
                          href="#home"
                          className="cursor-pointer dismiss-click"
                          onClick={(e) => this.onDismiss(item, e)} >

                          <i className="material-icons nothing-rhymes-with-orange">
                            highlight_off
                          </i>
                          Dismiss Post </a>
                      </div>
                      <div className="col-md-5 col-5">
                        <span className="nothing-rhymes-with-orange d-inline-block pull-right ml-1">
                          {item.data.num_comments}
                          comments
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-10 offset-md-1 bdr-btm mt-2"></div>
                    </div>
                  </li>
                }
              </div>
            ))}
          </ul>


          {this.isShown &&
            <a href="#home"
              onClick={(e) => this.onDismissAll(redditList, e)}

              className="cursor-pointer nothing-rhymes-with-orange">

              <i className="material-icons nothing-rhymes-with-orange ">
                highlight_off
          </i>

              Dismiss All </a>
          }

          {this.isHidden &&
            <a href="#home"
              onClick={(e) => this.onRestoreAll(e)}
              className="cursor-pointer nothing-rhymes-with-orange "  >
              <i className="material-icons nothing-rhymes-with-orange "> highlight_off
            </i> Restore All </a>
          }
        </div>

      );
    }
  }
}


export default RedditList;
