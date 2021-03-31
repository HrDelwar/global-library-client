import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const NotFound = () => {
    const history = useHistory();
    return (
        <Grid container justify="center" style={{ minHeight: 'calc(100vh - 50px)', alignItems: 'center', background: '#000a', color: '#fff' }}>
            <Grid item>
                <Typography align='center' color="inherit" variant="h1">404</Typography>
                <Typography align="center" color="inherit" variant="h3">Page Not Found!</Typography>
                <Grid container justify="center"><Button variant="outlined" style={{ color: '#fff', borderColor: '#fff', marginTop:'1rem' }} onClick={history.goBack}>Back</Button></Grid>
            </Grid>
        </Grid>
    );
};

export default NotFound;