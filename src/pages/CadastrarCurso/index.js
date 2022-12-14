import React, { useState } from 'react';
import { TextField, Grid, Button, MenuItem, InputLabel, Select } from '@material-ui/core';
import './styles.css'
import api from '../../services/api';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '../../components/Menu';
import { useNavigate } from "react-router-dom";
export default function CadastroCurso() {
    const navigate = useNavigate();
    const [links, setLinks] = useState([{
        link: '',
        nome: '',
        index: 0
    }]);
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [topico, setTopico] = useState('');
    const [dificuldade, setDificuldade] = useState('');
    const [descricao, setDescricao] = useState('');

    async function handleAddLinkInput() {
        setLinks([...links, { link: '' }]);
    }
    async function handleRemoveLinkInput() {
        const linksCopy = [...links];
        linksCopy.pop();
        setLinks(linksCopy);
    }

    async function handleCriarCurso(e) {
        e.preventDefault();
        console.log(links);
        let material_curso = links.map(eachLink => {
            return {
                nome: eachLink.nome,
                link: eachLink.link,
                ordem: eachLink.index,
            }
        })
        const data = {
            nome,
            dificuldade,
            autor,
            topico_nome: topico,
            material_curso,
            descricao
        }

        console.log(data)
        try {
            const response = await api.post('curso', data);
            alert(`Curso ${nome} Criado`);
            navigate(`/pergunta/curso/${response.data.id}`);

        } catch (e) {
            console.log(e);
            alert(`${e}`);

        }

    }

    async function handleChangeInput(index, event) {
        const values = [...links];
        values[index].link = event.target.value;
        values[index].index = index;
        setLinks(values);
    }

    async function handleChangeInputName(index, event) {
        const values = [...links];
        values[index].nome = event.target.value;
        values[index].index = index;
        setLinks(values);

    }

    return (
        <>
            <Menu />
                    <div class="titulo-bv2"><h1>Criar Curso</h1></div>
            <div class="cadastrar-curso-container">
                <form onSubmit={handleCriarCurso}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Nome do Curso"
                                autoFocus
                                value={nome}
                                onChange={e => setNome(e.target.value)}

                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Autor"
                                autoFocus
                                value={autor}
                                onChange={e => setAutor(e.target.value)}

                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <InputLabel id="demo-simple-select-label">Topico do curso</InputLabel>
                            <Select

                                className="select-listagem"
                                label="Topico"
                                onChange={e => setTopico(e.target.value)}
                            >  
                                <MenuItem value="NodeJs">NodeJs</MenuItem>
                                <MenuItem value="Java">Java</MenuItem>

                            </Select>

                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <InputLabel id="demo-simple-select-label">Dificuldade</InputLabel>
                            <Select

                                className="select-listagem"
                                label="Dificuldade"
                                onChange={e => setDificuldade(e.target.value)}
                            >
                                <MenuItem value="Facil">Fácil</MenuItem>
                                <MenuItem value="Medio">Médio</MenuItem>
                                <MenuItem value="Dificil">Difícil</MenuItem>

                            </Select>

                        </Grid>
                        {/* <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab> */}

                        <Grid item xs={6} sm={6}>
                            <Button className="addBtn" variant="contained" onClick={handleAddLinkInput}>
                                <AddIcon /> Link
                        </Button>

                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Button className="rmBtn" variant="contained" onClick={handleRemoveLinkInput}>
                                <DeleteIcon /> Link
                        </Button>
                        </Grid>


                        {links.map((link, index) => (
                            <>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        label="Link"
                                        value={link.link}
                                        onChange={event => handleChangeInput(index, event)}>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        label="Nome"
                                        value={link.nome}
                                        onChange={event => handleChangeInputName(index, event)}>

                                    </TextField>
                                </Grid>

                            </>
                        ))}

                        <Grid item xs={12} sm={12}>
                            <textarea
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Descrição do Curso"
                                className="textArea"
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="cadastro-btn"
                        sx={{ mt: 100, mb: 2 }}
                    >
                        Cadastrar
                        </Button>
                </form>
            </div >
        </>
    );
}