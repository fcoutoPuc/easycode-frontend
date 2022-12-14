import Menu from '../../components/Menu';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import api from '../../services/api';
import { useState, useEffect } from 'react';

export default function Indicadores() {
    const [newCurso, setNewCurso] = useState(0);
    const [newTrajeto, setNewTrajeto] = useState(0);
    const [finalizaCurso, setFinalizaCurso] = useState(0);
    const [finalizaTrajeto, setFinalizaTrajeto] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            const indicadores = await api.get(`/indicadores`);
            console.log(indicadores.data.indicador_cursos_criados);
            setNewCurso(indicadores.data.indicador_cursos_criados);
            setNewTrajeto(indicadores.data.indicador_trajetos_criados);
            setFinalizaCurso(indicadores.data.indicador_aluno_curso);
            setFinalizaTrajeto(indicadores.data.indicador_aluno_trajeto);
        }
        fetchData()
            .catch(console.error);

    }, [])
    
    return (
        <>
            <Menu />
            <div class="listar-trajetos-cursos-container">
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Indicador de desempenho 1:</div>

                                </Typography>
                                <Typography variant="h6" component="div">
                                    <div class="titulo-bv2">Novos Cursos Criados nos últimos 7 dias</div>

                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2.5 }} color="text.secondary">
                                    {newCurso}
                            </Typography>

                            </CardContent>

                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Indicador de desempenho 2:</div>

                                </Typography>
                                <Typography variant="h6" component="div">
                                    <div class="titulo-bv2">Novos Trajetos Criados nos últimos 7 dias</div>

                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2.5 }} color="text.secondary">
                                    {newTrajeto}
                            </Typography>

                            </CardContent>

                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Indicador de desempenho 3:</div>

                                </Typography>
                                <Typography variant="h6" component="div">
                                    <div class="titulo-bv2">Cursos Finalizados 7 dias</div>

                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2.5 }} color="text.secondary">
                                    {finalizaCurso}
                            </Typography>

                            </CardContent>

                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Indicador de desempenho 4:</div>

                                </Typography>
                                <Typography variant="h6" component="div">
                                    <div class="titulo-bv2">Trajetos Finalizados 7 dias</div>

                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2.5 }} color="text.secondary">
                                {finalizaTrajeto}
                            </Typography>

                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </div>

        </>
    )
}