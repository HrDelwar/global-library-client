import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';


const Home = () => {
    document.title = 'Home || Global Library'
    document.body.style.cssText = 'background: linear-gradient(45deg, #0986f4,#13a16c);min-height:100vh';
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://damp-plains-62329.herokuapp.com/allBooks')
            .then(res => res.json())
            .then(data => {
                setBooks(data.reverse());
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])
    return (
        <Container>
            {loading ?
                <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <CircularProgress />
                </Grid>
                :
                <Grid container justify="center" spacing={3} style={{marginTop:'1.5rem'}}>
                    {
                        books.map(book => <Book book={book} key={book._id} />)
                    }
                </Grid>

            }
        </Container>
    );
};

export default Home;