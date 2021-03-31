import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import moment from 'moment';

const Order = () => {
    document.title = 'Order || Global Library'
    document.body.style.cssText = 'background: linear-gradient(45deg, #0986f4,#13a16c);min-height:100vh';
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('https://damp-plains-62329.herokuapp.com/userOrders', {
            headers: {
                'email': loggedUser.email
            }
        })
            .then(res => {
                setOrders(res.data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [loggedUser.email])


    return (
        <Container className="text-white mt-4">
            { loading ?
                <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <CircularProgress />
                </Grid>
                :
                <>
                    <h1 className="text-capitalize text-center">Your ordered book</h1>
                    <Grid container justify="center" className="mt-5">
                        {
                            orders.map(order => (
                                <Grid key={order._id} item container alignItems="center" xs={10} sm={10} md={8} justify="center" className="border mb-3 rounded p-3 p-sm-0">
                                    <Grid container className="justify-content-md-start justify-content-center" item xs={10} sm={4} >
                                        <div className=" overflow-hidden" style={{ maxWidth: 250, maxHeight: 300 }} >
                                            <img className="w-100 rounded" src={order.bookInfo.cover} alt={order.bookInfo.name} />
                                        </div>
                                    </Grid>
                                    <Grid container justify="center" item xs={10} sm={8}>
                                        <div className="p-3 text-capitalize">
                                            <h6><strong>Book Name : </strong>{order.bookInfo.name}</h6>
                                            <h6><strong>Author Name : </strong>{order.bookInfo.author}</h6>
                                            <h6><strong>Price : </strong>$ {order.bookInfo.price}</h6>
                                            <h6><strong>Order Place : </strong>{moment(order.orderPlace).format('LLLL')}</h6>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </>}
        </Container>
    );
};

export default Order;