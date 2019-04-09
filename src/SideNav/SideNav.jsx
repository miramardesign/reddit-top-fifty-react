import React from 'react';
import RedditList from '../RedditList/RedditList';
import RedditDesc from '../RedditDesc/RedditDesc';

class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      item: {
        data: {
          author: '',
          title: ''
        }
      }
    };
  }

  /** passed from child */
  onItemClick = (item) => {
    console.log(item, "itemclick in parent called");
    this.setState({
      item: item
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <div className="SideNavWrapper">
          <div className="App sidnav-container row">

            <div className="col-md-4">
              <RedditList onItemClick={this.onItemClick}>

              </RedditList>
            </div>

            <div className="col-md-8">
              <RedditDesc item={this.state.item}>

              </RedditDesc>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SideNav;

