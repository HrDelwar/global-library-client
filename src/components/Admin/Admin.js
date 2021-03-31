import React, { useContext } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import AddBooks from '../AddBooks/AddBooks';
import EditBooks from '../EditBooks/EditBooks';
import ManageBooks from '../ManageBooks/ManageBooks';
import { AppBar, Button, CssBaseline, Divider, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import Home from '../Home/Home';
import { UserContext } from '../../App';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& a': {
            textDecoration: 'none',
            color: '#fff'
        },
        '& .MuiDrawer-paper': {
            background: '#333',
        },
        '& .MuiListItemIcon-root, .MuiButtonBase-root': {
            color: '#fff'
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
}));



const Admin = () => {
    document.title = 'Manage Book || Global Library'
    document.body.style.cssText = 'background: linear-gradient(45deg, rgba(80, 253, 75, 0.36), rgba(71, 0, 228, 0.56));min-height:100vh; color:#fff';

    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Router>
            <Switch>

                <Route
                    path="/home"
                    component={() => {
                        window.location.reload()
                        return <Home />
                    }}
                />
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Hidden smDown>
                                <Typography variant="h6" className={classes.title}>
                                    Global Library
                                </Typography>

                            </Hidden>
                            <NavLink to="/home"><Button color="inherit">Home</Button></NavLink>
                            <Hidden xsDown>
                                {loggedUser.name && <Typography align="center" variant="button" style={{ marginRight: '1rem', color: 'rgb(1, 236, 248)' }}>{loggedUser.name}</Typography>}
                            </Hidden>

                            {
                                loggedUser.email &&
                                <Button onClick={() => setLoggedUser({})} variant="contained" color="primary">Logout</Button>

                            }

                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <IconButton color="inherit" onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                            <Hidden mdUp>
                                <Typography variant="h6" style={{color:'#fff'}} className={classes.title}>
                                    Global Library
                                </Typography>
                            </Hidden>
                        </div>
                        <Divider />
                        <List>

                            <NavLink to="/admin/manage-books">
                                <ListItem button >
                                    <ListItemIcon ><AcUnitIcon /></ListItemIcon>
                                    <ListItemText primary='Manage Book' />
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/add-books">
                                <ListItem button >
                                    <ListItemIcon><AddBoxIcon /></ListItemIcon>
                                    <ListItemText primary='Add Book' />
                                </ListItem>
                            </NavLink>
                            <NavLink to="/admin/edit-books/">
                                <ListItem button >
                                    <ListItemIcon><EditIcon /></ListItemIcon>
                                    <ListItemText primary='Edit Book' />
                                </ListItem>
                            </NavLink>

                        </List>
                        <Divider />
                    </Drawer>
                    <main className={classes.content}>
                        <Route path='/admin/manage-books' component={() => <ManageBooks />} />
                        <Route path='/admin/add-books' component={() => <AddBooks />} />
                        <Route path='/admin/edit-books/:bookId' component={() => <EditBooks />} />
                        <Route path="/">
                            <Redirect to="/admin/manage-books" />
                        </Route>
                    </main>
                </div>


            </Switch>

        </Router>
    );
};

export default Admin;