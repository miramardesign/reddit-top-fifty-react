import React from 'react';
import RedditList from '../RedditList/RedditList';
import RedditDesc from '../RedditDesc/RedditDesc';

import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};


class SideNav extends React.Component {

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      mobileOpen: false,
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


    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <section>

          <div>
            <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
            <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
            <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
            <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
              onOpen={this.toggleDrawer('left', true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </SwipeableDrawer>
            <SwipeableDrawer
              anchor="top"
              open={this.state.top}
              onClose={this.toggleDrawer('top', false)}
              onOpen={this.toggleDrawer('top', true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}
              >
                {fullList}
              </div>
            </SwipeableDrawer>
            <SwipeableDrawer
              anchor="bottom"
              open={this.state.bottom}
              onClose={this.toggleDrawer('bottom', false)}
              onOpen={this.toggleDrawer('bottom', true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('bottom', false)}
                onKeyDown={this.toggleDrawer('bottom', false)}
              >
                {fullList}
              </div>
            </SwipeableDrawer>
            <SwipeableDrawer
              anchor="right"
              open={this.state.right}
              onClose={this.toggleDrawer('right', false)}
              onOpen={this.toggleDrawer('right', true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('right', false)}
                onKeyDown={this.toggleDrawer('right', false)}
              >
                {sideList}
              </div>
            </SwipeableDrawer>
          </div>


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

        </section>
      );

    }
  }
}

//export default SideNav;

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideNav)