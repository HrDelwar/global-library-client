import { AppBar, Button, Drawer, Hidden, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiAppBar-root': {
            background: 'transparent'
        },
        '& a': {
            textDecoration: 'none',
            color: '#fff'
        },
        '& a:focus': {
            outline: 'none'
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        minWidth: '200px',
        '& .MuiListItem-root': {
            justifyContent: 'center',
            padding: '5px 0',
        },
        '& .MuiListItem-root a': {
            width: '100%',
            textAlign: 'center',
        },
        '& .MuiListItem-root a.active .MuiButton-label': {
            color: '#fff'
        },
    },
}));

const activeStyle = {
    fontWeight: "bold",
    color: "#fff",
    background: '#0000008f'
}

const Header = () => {
    const classes = useStyles();
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [state, setState] = useState(false);

    const toggleDrawer = () => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(!state);
    };

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
            className={classes.fullList}
        >
            <List>
                <ListItem  >
                    <NavLink activeStyle={activeStyle} to="/home">
                        <ListItemText >
                            <Button >Home</Button>
                        </ListItemText>
                    </NavLink>
                </ListItem>

                <ListItem  >
                    <NavLink activeStyle={activeStyle} to="/order">
                        <ListItemText >
                            <Button >Order</Button>
                        </ListItemText>
                    </NavLink>
                </ListItem>
                <ListItem  >
                    <NavLink activeStyle={activeStyle} to="/admin">
                        <ListItemText >
                            <Button >Admin</Button>
                        </ListItemText>
                    </NavLink>
                </ListItem>

            </List>

        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={state} onClose={toggleDrawer(false)}>
                            {list()}
                        </Drawer>
                    </Hidden>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">Global Library</Link>
                    </Typography>
                    <Hidden smDown>
                        <NavLink activeStyle={activeStyle} to="/home"><Button color="inherit">Home</Button></NavLink>
                        <NavLink activeStyle={activeStyle} to="/order"><Button color="inherit">Order</Button></NavLink>
                        <NavLink activeStyle={activeStyle} to="/admin"><Button color="inherit">Admin</Button></NavLink>
                        {loggedUser.name && <Typography align="center" variant="button" style={{ marginRight: '1rem', color: 'rgb(1, 254, 88)' }}>{loggedUser.name}</Typography>}
                    </Hidden>
                    {
                        loggedUser.email ?
                            <Button onClick={() => setLoggedUser({})} variant="contained" color="primary">Logout</Button>
                            :
                            <NavLink activeStyle={activeStyle} to="/login"><Button variant="contained" color="primary">Login</Button></NavLink>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;