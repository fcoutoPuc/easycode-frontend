import './styles.css'
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import Menu from '../../components/Menu';
export default function FazerTrajeto() {
    const { trajetoId } = useParams();
    const [trajetoInfo, setTrajetoInfo] = useState({});
    const [cursoInfo, setCursoInfo] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get(`/trajeto/${trajetoId}`);
            console.log(response.data.cursos);
            response.data.cursos = response.data.cursos.sort((a,b) => (a.ordem - b.ordem));
            setTrajetoInfo({
                autor: response.data.autor,
                id: response.data.id,
                nome: response.data.nome,
                topico_nome: response.data.topico_nome
            });

            setCursoInfo(response.data.cursos);
            console.log(response.data);

            


        }
        fetchData()
            .catch(console.error);

    }, [])

    async function handleFinalizarTrajeto(e) {
        const email = localStorage.getItem('email');
        console.log(email);
        console.log(trajetoId);
        try {
            await api.post(`trajeto/finaliza/${email}/${trajetoId}`);
            alert(`Trajeto Finalizado`)
            navigate('/aluno/material');
        } catch (e) {
            console.log(e);
            alert(`${e}`);
        }

    }





    return (

        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>
                    Fazer trajeto: {trajetoInfo.nome}
                </h1>

            </div>
            <div class="cadastrar-trajeto-container">

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    Cursos do trajeto
                        </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {/* A diferença entre um curso e um trajeto é que o curso é um módulo úncio sobre um tema específico, enquanto o trajeto é algo mais completo, englobando diversos cursos co-relacionados */}
                                </Typography>

                            </CardContent>

                        </Card>
                    </Grid>



                    {cursoInfo.map((curso, index) => (

                        <>
                            <Grid item xs={4} sm={4}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {curso.topico_nome}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {curso.nome}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Dificuldade: {curso.dificuldade}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => {
                                            navigate(`/curso/${curso.curso_id}/trajeto`);
                                        }} size="small">Fazer Curso</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </>
                    ))}



                </Grid>
            </div>
            <Button
                className="finalizar-trajeto-btn"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleFinalizarTrajeto}        
            >
                Finalizar Trajeto
            </Button>
        </>

    )
}