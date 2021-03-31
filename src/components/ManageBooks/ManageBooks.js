import { Button, CircularProgress, Container, Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';
import { Link } from 'react-router-dom';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'author', label: 'Author Name', minWidth: 100 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 170,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
    },
];

function createData(name, author, price, action, id) {
    return { name, author, price, action, id };
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 600,
    },
});

const ManageBooks = () => {
    document.title = 'Manage Book || Global Library'
    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const rows = books.map(book => createData(book.name, book.author,
        <Button style={{ color: '#333' }}>
            <AttachMoneyIcon />{book.price}
        </Button>
        ,
        <div>
            <Link to={`/admin/edit-books/${book._id}`}>
                <IconButton aria-label="delete" style={{ color: '#fff', background: '#0d656e', marginRight: '.5rem' }}>
                    <EditIcon />
                </IconButton>
            </Link>
            <IconButton onClick={() => deleteBook(book._id)} aria-label="delete" style={{ color: '#fff', background: 'red' }}>
                <DeleteIcon />
            </IconButton>
        </div>
        ,
        book._id
    ))

    const deleteBook = (id) => {
        const element = document.querySelector('.book-' + id);
        const url = `https://damp-plains-62329.herokuapp.com/deleteBook/${id}`
        axios.delete(url)
            .then(result => {
                if (result.data) element.style.display = 'none';
                setCount(count - 1);
                setDeleteSuccess(true);
            })
            .catch(err => {
                // console.log(false);
            })
    }


    useEffect(() => {
        fetch('https://damp-plains-62329.herokuapp.com/allBooks')
            .then(res => res.json())
            .then(data => {
                setCount(data.length)
                setBooks(data.reverse());
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container>
            {loading ?
                <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <CircularProgress />
                </Grid>
                :
                <>
                    <Typography variant="h4" variantMapping={{ h4: 'h1' }} style={{ marginBottom: '2rem' }} align="center">Manage Books!</Typography>
                    { deleteSuccess && <Typography  variant="h5" variantMapping={{ h5: 'h2' }} align="center">Book Delete successfully!</Typography>}

                    <Paper className={classes.root}>

                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={'book-' + row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
            }
        </Container>
    );
};

export default ManageBooks;