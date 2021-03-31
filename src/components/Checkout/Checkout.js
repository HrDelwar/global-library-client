import { Button, CircularProgress, Container, Divider, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';
import { UserContext } from '../../App';



const Checkout = () => {
    const { checkoutBookId } = useParams();
    document.title = 'Checkout || Global Library'
    document.body.style.cssText = 'background: linear-gradient(45deg, #0986f4,#13a16c);min-height:100vh';
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useContext(UserContext);


    useEffect(() => {
        fetch(`https://damp-plains-62329.herokuapp.com/singleBook/${checkoutBookId}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [checkoutBookId])

    const history = useHistory()

    const handelCheckout = () => {
        const data = { bookInfo: book, orderPlace: new Date(), user: loggedUser }
        axios.post('https://damp-plains-62329.herokuapp.com/addOrder', data)
            .then(result => {
                history.replace('/order')
            })
            .catch(err => {
                // console.log(err);
            })
    }

    return (
        <Container className='mt-5 text-white'>
            {loading ?
                <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <CircularProgress />
                </Grid>
                : <>
                    <h2 >Checkout</h2>
                    <div className="mt-5 text-capitalize">
                        <div className="d-flex justify-content-between">
                            <h5>Book Name</h5>
                            <h5>Author</h5>
                            <h5>Quantity</h5>
                            <h5>Price</h5>
                        </div>
                        <Divider />
                        <div className="d-flex justify-content-between align-items-center" style={{ minHeight: '5rem' }}>
                            <h6>{book.name}</h6>
                            <h6>{book.author}</h6>
                            <h6>1</h6>
                            <h6><AttachMoneyIcon />{book.price}</h6>
                        </div>
                        <Divider light />
                        <div className="d-flex justify-content-between mt-3">
                            <h6>total</h6>
                            <h6>1</h6>
                            <h6><AttachMoneyIcon />{book.price}</h6>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="contained" color="secondary" onClick={handelCheckout} > Checkout</Button>
                        </div>
                    </div>
                </>}
        </Container>
    );
};

export default Checkout;