import { Button, Container,   Grid, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IMAGE_BB_KEY } from '../../env';



const AddBooks = () => {

    document.title = "Add Books || Global Library";
    const [success, setSuccess] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({});
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        axios.post('https://damp-plains-62329.herokuapp.com/addBook', data)
            .then(result => {
                setSuccess(result.data);
                setUploadedImage({});
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
            <Typography variant="h4" variantMapping={{ h4: 'h1' }} align="center">Add your awesome Book!</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField name="name"
                    error={errors.name}
                    helperText={errors.name && errors.name.message}
                    inputRef={register({
                        required: {
                            value: true,
                            message: 'Book name is required'
                        }
                    })} label="Book Name" fullWidth variant="outlined" margin="normal" />

                <TextField name="author"
                    error={errors.author}
                    helperText={errors.author && errors.author.message}
                    inputRef={register({
                        required: {
                            value: true,
                            message: 'Author name is required'
                        }
                    })}
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

                <Button type="submit" style={{ color: '#333' }} variant="outlined" >Add Book</Button>
            </form>
            { success && <Typography variant="h4" variantMapping={{ h4: 'h1' }} align="center">Book add successfully!</Typography>}
        </Container>
    );
};

export default AddBooks;