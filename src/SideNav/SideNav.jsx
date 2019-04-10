import React from 'react';
import RedditList from '../RedditList/RedditList';
import RedditDesc from '../RedditDesc/RedditDesc';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class SideNav extends React.Component {

  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  constructor(props) {
    super(props);

    this.state = {
      open: true,
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

    const { classes, theme } = this.props;
    const { open } = this.state;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <section>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Reddit Posts
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'ltr' ? <i className="material-icons">chevron_left</i> : <i className="material-icons">chevron_right</i>}
                </IconButton>
              </div>

              <Divider />
              <RedditList onItemClick={this.onItemClick}>
                </RedditList>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <RedditDesc item={this.state.item}>
              </RedditDesc>
            </main>
          </div>

          <div className="SideNavWrapper">
            <div className="App sidnav-container row">

              <div className="col-md-4">
          
                &nbsp;
              </div>

              <div className="col-md-8" onClick={this.handleDrawerOpen}>
                &nbsp;
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