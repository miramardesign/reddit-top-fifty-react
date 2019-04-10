import React from 'react';
import './RedditList.scss';

import TimeAgo from 'react-timeago';
 
class RedditList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);

    // todo: move to redux?
    this.perist = {
      set(key, data) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
          console.error('Error saving to localStorage', e);
        }
      },
      get(key) {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch (e) {
          console.error('Error getting data from localStorage', e);
          return null;
        }
      },
      clear() {
        localStorage.clear();
      }
    }

    this.state = {
      hasError: false,

      error: null,
      isLoaded: false,
      redditList: [],
      hiddenList: this.perist.get('hiddenList') || [],
      visitedList: this.perist.get('visitedList') || []
    };

  }


  componentDidMount = () => {
    console.log('RedditList mounted');
    const num = 50;
    const topUrl = `https://www.reddit.com/r/all/top.json?limit=${num}`;
    //this.hiddenList = this.perist.get('hidden') || [];
    //this.visitedList = this.perist.get('visited') || [];

    fetch(topUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('chilidren', result.data.children);

          const redditList = result.data.children;
          const hiddenList = [];
          const visitedList = [];

          // pushed dismissed and visted into items
          redditList.forEach(item => {
            if (this.state.hiddenList.indexOf(item.data.id) > -1) {
              item.data.hidden = true;
              hiddenList.push(item.data.id);
            }
            if (this.state.visitedList.indexOf(item.data.id) > -1) {
              item.data.visited = true;
              visitedList.push(item.data.id);
            }

          });

          //push the state from the load into
          this.setState({
            isLoaded: true,
            redditList: redditList,
            hiddenList: hiddenList,
            visitedList: visitedList
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

  /**
   * click events
   */
  onItemClick = (item, e) => {
    item.data.visited = true;

    let visitedList = this.state.visitedList;
 
    if(!this.isState('visitedList', item.data.id)){
      visitedList.push(item.data.id);
      this.perist.set('visitedList', visitedList);
      this.setState({
        visitedList: visitedList
      });
    }

    e.preventDefault();
    this.forceUpdate();
    this.props.onItemClick(item);
  };

  /**
   * dismiss item
   */
  onDismiss = (item, e) => {
    item.data.hidden = true;
    let hiddenList = this.state.hiddenList;
    hiddenList.push(item.data.id);
 
    this.perist.set('hiddenList', hiddenList);
    this.setState({
      hiddenList: hiddenList
    });

    e.preventDefault();
    this.forceUpdate();
    console.log("item dismiss called", item);
  };

  isState = (name, id) => {
    return this.state[name].indexOf(id) > -1;
  }


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
    this.perist.set('hiddenList', hiddenList);
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
    this.perist.set('visitedList', []);
    this.perist.set('hiddenList', []);

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
