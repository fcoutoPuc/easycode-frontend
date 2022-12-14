
import React, { useState } from 'react';
import './styles.css'
import { Box, Container, TextField, Grid, Typography, Button, Avatar, Link } from '@material-ui/core';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

import CloseIcon from '@material-ui/icons/Close';

import Alert from '@material-ui/lab/Alert';



export default function Login() {
    const [open, setOpen] = React.useState(true);

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(false);
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            senha
        };
        try {
            const response = await api.post('login', data);
            console.log(response);
            console.log(response.data);
            localStorage.setItem('easycode_email', response.data.email);
            localStorage.setItem('nome', response.data.nome);
            navigate('/aluno/material');
        } catch (e) {

            console.log(e);
            // alert(`Email ou senha inválidos`);
            setAlert(true);
            <Alert severity="error">This is an error alert — check it out!</Alert>
            setEmail('');
            setSenha('');
        }
    }

    return (
        <>
            {alert ? <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Email ou senha inválido
                </Alert>
            </Collapse>: <></>}




            <Container component="main" maxWidth="xs">
                <Box className="teste" onSubmit={handleLogin}>
                    <Avatar>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
          </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    autoFocus
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Senha"
                                    name="senha"
                                    autoComplete="family-name"
                                    type="password"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <div class="link-para-login">
                            <Link href="/"> Deseja se Cadastrar?</Link>
                        </div>
                        <div class="btn-cadastro">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"

                                sx={{ mt: 100, mb: 2 }}
                            >
                                Login
                        </Button>
                        </div>

                        <Grid container justifyContent="flex-end">
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </>
    );

}