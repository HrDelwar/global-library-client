import { Button, Card, CardActionArea, CardActions, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 290,
        background: '#4d4d4d',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& *': {
            textTransform: 'capitalize'
        },
        '& .MuiCardActions-root': {
            justifyContent: 'space-between'
        }
    },
    media: {
        maxHeight: 300,
        overflow: 'hidden',
        '& img': {
            width: '100%'
        }
    },
});

const Book = ({ book }) => {
    const classes = useStyles();

    const { _id, name, author, price, cover } = book;
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} container justify="center">
            <Card className={classes.root}>
                <Link to={`/checkout/${_id}`} className="text-white">
                    <CardActionArea>
                        <div className={classes.media}>
                            <img src={cover} alt={name} />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {author}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <Button size="small" color="inherit" startIcon={<AttachMoneyIcon />}>
                        {price}
                    </Button>
                    <Link to={`/checkout/${_id}`}>
                        <Button size="small" color="secondary" variant="contained">
                            Bye Now
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Book;