import React, { useState } from 'react';
import './styles.css'

import { Box, Container, CssBaseline, Checkbox, TextField, Grid, Typography, FormControlLabel, Button, Avatar, ListItemText, Link } from '@material-ui/core';
import api from '../../services/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            email,
            nome,
            senha,
            telefone,
        }
        try {
            const response = await api.post('aluno', data);
            alert(`Aluno: ${nome} criado`)
            navigate('/login')
        } catch (e) {
            console.log(e);
            alert(`${e}`)
        }


        console.log('oi');
        console.log('nome ' + nome);
        console.log('telefone ' + telefone);
        console.log('email ' + email);
        console.log('senha ' + senha);

    }
    return (
        <Container component="main" maxWidth="xs">
            <Box className="teste">
                <Avatar>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastrar Aluno
                </Typography>
                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="nome"
                                label="Nome"
                                autoFocus
                                value={nome}
                                onChange={e => setNome(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="Email"
                                autoComplete="family-name"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Telefone"
                                name="telefone"
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <div class="link-para-login">
                        <Link href="/login"> Já possui uma Conta?</Link>
                    </div>
                    <div class="btn-cadastro">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            sx={{ mt: 100, mb: 2 }}
                        >
                            Cadastro
                        </Button>
                    </div>

                    <Grid container justifyContent="flex-end">
                        <Grid item>

                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}