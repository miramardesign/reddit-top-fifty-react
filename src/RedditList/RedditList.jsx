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
      redditList: []
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
                <li
                  className="nav-item">
                  {/* *ngIf="!item?.data.hidden"  */}
                  {/* [@enterAnimation] */}

                  <div className="row cursor-pointer" >
                    {/* (click)="onItemClick(item)" */}
                    <div className="col-md-10">
                      <span
                        className="bluebullets">&bull;</span>
                      {/* [ngClass]="{'visited': item?.data?.visited}" */}
                      <span className="cursor-pointer"
                      >
                        {item.data.author} <TimeAgo date={item.data.created * 1000} />
                      </span>
                    </div>
                  </div>
                  <div className="row align-items-center cursor-pointer">
                    {/* // (click)="onItemClick(item)" */}

                    <div className="col-md-5 col-sm-5 col-5">

                      <span className="cursor-pointer"
                      >
                        <img src="item.data.thumbnail"
                          alt="item.data.title" />

                      </span>
                    </div>

                    <div className="col-md-5 col-sm-5 col-5 cursor-pointer" >
                      {/* (click)="onItemClick(item)" */}
                      <span className="cursor-pointer"

                      >
                        {/* (click)="onItemClick(item)" */}
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
                        href="https://changeme99999999999999999999999.com"
                        className="cursor-pointer dismiss-click">
                        {/* (click)="onDismiss(item)" */}

                        <i className="material-icons nothing-rhymes-with-orange">
                          highlight_off
              </i>
                        Dismiss Post </a>
                    </div>
                    <div className="col-md-5 col-5">
                      <span className="nothing-rhymes-with-orange d-inline-block pull-right ml-1">{item.data.num_comments}
                        comments
              </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-10 offset-md-1 bdr-btm mt-2"></div>
                  </div>

                </li>
              </div>
            ))}
          </ul>

          <a href="https://changeme99999999999999999999999.com"

            className="cursor-pointer nothing-rhymes-with-orange"
          > <i className="material-icons nothing-rhymes-with-orange ">
              {/* *ngIf="redditList?.length > 0 && hiddenList?.length < 49" */}
              highlight_off
     </i> Dismiss All </a>
          {/* (click)="onDismissAll(redditList)" */}
          <a href="https://changeme99999999999999999999999.com"
            className="cursor-pointer nothing-rhymes-with-orange "
          ><i className="material-icons nothing-rhymes-with-orange "> highlight_off
    </i> Restore All </a>
          {/* *ngIf="redditList?.length > 0 && hiddenList?.length > 1" */}
          {/* (click)="onRestoreAll()" */}



        </div>

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
