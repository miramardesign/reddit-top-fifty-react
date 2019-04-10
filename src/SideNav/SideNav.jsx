import React from 'react';
import RedditList from '../RedditList/RedditList';
import RedditDesc from '../RedditDesc/RedditDesc';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 480;

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

  toggleIfHandset = () => {
    console.log('toggle handset ccalled');
    const isHandset = window.innerWidth <= 500;
    if (isHandset) {
      this.setState({ open: !this.state.open });
    }
  };

  toggle = () => {
    console.log('toggle ccalled');
    this.setState({ open: !this.state.open });
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

    const { classes } = this.props;
    let { open } = this.state;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return (
        <section>
          <div className={classes.root}>
            <CssBaseline />

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClick={this.toggleIfHandset}
            >

              <RedditList onItemClick={this.onItemClick}>
              </RedditList>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}
              onClick={this.toggle}
            >
              <div className={classes.drawerHeader} />
              <RedditDesc item={this.state.item}  >
              </RedditDesc>
            </main>
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