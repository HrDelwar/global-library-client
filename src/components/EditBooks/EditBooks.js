import { Button, CircularProgress, Container, Grid, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { IMAGE_BB_KEY } from '../../env';
import { useParams } from 'react-router-dom';

const EditBooks = () => {
    const { bookId } = useParams();
    document.title = "Edit Book || Global Library";
    const [success, setSuccess] = useState(false);
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploadedImage, setUploadedImage] = useState({});
    const { register, handleSubmit, errors } = useForm();



    useEffect(() => {
        fetch(`https://damp-plains-62329.herokuapp.com/singleBook/${bookId}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                setUploadedImage({ display_url: data.cover })
                setLoading(false)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [bookId])

    const onSubmit = data => {
        const newDate = { ...data, id: bookId }
        axios.patch(`https://damp-plains-62329.herokuapp.com/updateBook/`, newDate)
            .then(result => {
                setSuccess(result.data);
                setBook({});
                setUploadedImage({})
            })
            .catch(err => {
                // console.log(err);
            })

    };

    const uploadImage = event => {
        const imageData = new FormData()
        imageData.set('key', IMAGE_BB_KEY);
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (res) {
                setUploadedImage(res.data.data)
            })
            .catch(function (error) {
                // console.log(error);
            });
    }


    return (
        <Container style={{ marginTop: '1rem' }}>
            {
                loading ?
                    <Grid container justify="center" alignItems="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                        <CircularProgress />
                    </Grid>
                    :
                    <>
                        <Typography variant="h4" variantMapping={{ h4: 'h1' }} align="center">Edit Book Info!</Typography>
                        {book.name && <form onSubmit={handleSubmit(onSubmit)}>

                            <TextField name="name"
                                error={errors.name}
                                helperText={errors.name && errors.name.message}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Book name is required'
                                    }
                                })}
                                defaultValue={book.name}
                                label="Book Name" fullWidth variant="outlined" margin="normal" />

                            <TextField name="author"
                                error={errors.author}
                                helperText={errors.author && errors.author.message}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Author name is required'
                                    }
                                })}
                                defaultValue={book.author}
                                label="Author Name" fullWidth variant="outlined" margin="normal" />

                            <TextField name="price"
                                error={errors.price}
                                type='number'
                                helperText={errors.price && errors.price.message}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'Price is required'
                                    }
                                })}
                                defaultValue={book.price}
                                label="Book Price" fullWidth variant="outlined" margin="normal" />

                            <input hidden type="text" name="cover" value={uploadedImage.display_url}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Book cover image is required'
                                    }
                                })}
                            />

                            {uploadedImage.display_url && <Grid container justify="center" style={{ maxWidth: '200px' }}>
                                <img style={{ width: '100%', padding: '5px', boxShadow: '2px 2px 12px #999' }} src={uploadedImage.display_url} alt="" />
                            </Grid>}
                            <TextField
                                error={errors.cover}
                                helperText={errors.cover && errors.cover.message}
                                onChange={uploadImage} label="Book Cover Image" type="file" fullWidth variant="outlined" margin="normal" />

                            <Button type="submit" style={{ color: '#333' }} variant="outlined" >Update Book</Button>
                        </form>}
                        { success &&  <Typography style={{ color: '#0f09' }} variant="h4" variantMapping={{ h4: 'h1' }} align="center">Book update successfully!</Typography>}
                    </>}
        </Container>
    );
};

export default EditBooks;