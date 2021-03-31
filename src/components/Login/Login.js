import { Button, Container, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { getGoogleProvider, getGithubProvider, signInWithProviderFirebase, createUserWithEmailPassword, signInWithEmailAndPassword } from './loginManager';
import { UserContext } from '../../App';
import { useForm, Controller } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1.5rem',
        borderRadius: '5px',
        padding: '2rem',
        border: '1px solid #fffa',
        color: '#fffa',
        '& form > *': {
            margin: theme.spacing(2),
            color: '#fffa'
        },
        '& input[type="submit"]': {
            background: '#444644',
            color: '#fff',
            cursor: 'pointer'
        },
        '& span': {
            color: 'blue',
            cursor: 'pointer'
        },
        '& .MuiFormLabel-root , & .MuiInputBase-root, & .MuiFormLabel-asterisk.MuiInputLabel-asterisk': {
            color: '#fffa'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff5'
        },
        '& .MuiOutlinedInput-notchedOutline:hover': {
            borderColor: '#00cfff'
        },
    },
    divider: {
        background: '#fff',
        minWidth: '200px'
    }
}));

const Login = () => {
    document.title = 'Login || Global Library'
    document.body.style.cssText = 'background: linear-gradient(45deg, rgb(22, 132, 213), rgba(126, 5, 124, 0.74));min-height:100vh';
    const classes = useStyles();
    const [newUser, setNewUser] = useState(false);

    const { handleSubmit, control, errors, watch } = useForm();


    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const googleProvider = getGoogleProvider;
    const githubProvider = getGithubProvider;

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const signInWithProvider = provider => {
        signInWithProviderFirebase(provider)
            .then(res => {
                if (res.email) {
                    const { displayName, email } = res;
                    setLoggedUser({ name: displayName, email });
                    history.replace(from);
                } else {
                    setLoggedUser({ error: res });
                }
            })
    }
    const onSubmit = data => {
        const { name, email, password } = data;
        if (newUser && name && email && password) {
            createUserWithEmailPassword(name, email, password)
                .then(res => {
                    if (res.email) {
                        const { displayName, email } = res;
                        setLoggedUser({ name: displayName || name, email });
                        history.replace(from);
                    } else {
                        setLoggedUser({ userError: res });
                    }
                })
        }
        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
                .then(res => {
                    if (res.email) {
                        const { displayName, email } = res;
                        setLoggedUser({ name: displayName || name, email });
                        history.replace(from);
                    } else {
                        setLoggedUser({ userError: res });
                    }
                })
        }
    };

    return (
        <Container maxWidth="lg" >
            <Grid container justify="center">

                <Grid item xs={12} sm={8} md={6} >
                    <h2 className="text-center text-white m-3 text-capitalize">For access first login</h2>
                    {loggedUser.userError && <Typography style={{ marginTop: '1rem' }} color="error" align="center">{loggedUser.userError}</Typography>}
                    <div className={classes.root}>
                        <Typography variant="h5" color="inherit" variantMapping={{ h5: 'h1' }}>{newUser ? "Create an account" : "Login"}</Typography>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>


                            {newUser && <Controller as={TextField} required fullWidth color="inherit" type="text" name="name" control={control} id="outlined-basic" label="Name" defaultValue="" variant="outlined"
                                error={errors.name}
                                helperText={errors.name ? errors.name.message : null}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'You must specify a name'
                                    }
                                }}
                            />}


                            <Controller as={TextField} required fullWidth type="email" name="email" control={control} id="outlined-basic" label="Email" defaultValue="" variant="outlined"
                                error={errors.email}
                                helperText={errors.email ? errors.email.message : null}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'You must specify a email'
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Enter correct email address'
                                    }
                                }}
                            />

                            <Controller as={TextField} required fullWidth type="password" name="password" control={control} id="outlined-basic" label="Password" defaultValue="" variant="outlined"
                                error={errors.password}
                                helperText={errors.password ? errors.password.message : null}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'You must specify a password'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    },
                                }}
                            />


                            {newUser && <Controller as={TextField} fullWidth required type="password" name="confirmPassword" control={control} id="outlined-basic" label="Confirm Password" defaultValue="" variant="outlined"
                                error={errors.confirmPassword}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'You must Confirmed password'
                                    },
                                    validate: (value) => {
                                        return value === watch('password') || "Password did not match";
                                    }
                                }}
                            />}

                            <TextField style={{ background: 'red', cursor: 'pointer !important' }} type="submit" value={newUser ? "Create an account" : "Login"} fullWidth color="primary" variant="outlined" />
                        </form>
                        <Typography align="center">{newUser ? 'Already' : "Don't"} have an account? <span onClick={() => setNewUser(!newUser)} >{newUser ? 'Login' : 'Create an account'}</span></Typography>
                    </div>
                    <Grid container justify="center" style={{ alignItems: 'center', margin: '2rem 0' }}>
                        <Divider className={classes.divider} variant="middle" />
                        <Typography className="text-uppercase text-white">or</Typography>
                        <Divider className={classes.divider} variant="middle" />
                    </Grid>

                    <Grid container justify='center' style={{ alignItems: 'center', flexDirection: 'column', color: '#fff' }}>
                        <Button color="inherit" startIcon="G" variant="outlined" onClick={() => signInWithProvider(googleProvider)} style={{ marginBottom: '1rem' }}>Continue with google</Button>
                        <Button color="inherit" startIcon={<GitHubIcon />} variant="outlined" onClick={() => signInWithProvider(githubProvider)} >Continue with Github</Button>
                    </Grid>
                    <Typography align='center' color="error">{loggedUser.error && loggedUser.error}</Typography>
                </Grid>
            </Grid>
        </Container >
    );
};

export default Login;