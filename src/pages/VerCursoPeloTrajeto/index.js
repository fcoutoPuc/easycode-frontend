import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography} from '@material-ui/core';
import './styles.css'
import api from '../../services/api';
import { useState, useEffect } from 'react';
import Menu from '../../components/Menu';


export default function VerCursoPeloTrajeto() {
    const { cursoId } = useParams();
    const [linksCursos, setLinksCursos] = useState([]);
    const [cursoNome, setCursoNome] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/curso/material/${cursoId}`);
            setCursoNome(response.data.nome)
            setLinksCursos(response.data.material_curso);
        }
        fetchData()
            .catch(console.error);

    }, [])

    return (
        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>Curso: {cursoNome}</h1>

            </div>

            <div class="listar-trajetos-cursos-container">



                <Grid container spacing={2}>


                    {linksCursos.map((link, index) =>
                        <>
                            <Grid item xs={12} sm={12}>

                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>

                                        <Typography variant="h5" component="div">
                                            Aula {link.ordem + 1} {link.nome}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {/* A diferença entre um curso e um trajeto é que o curso é um módulo úncio sobre um tema específico, enquanto o trajeto é algo mais completo, englobando diversos cursos co-relacionados */}
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <iframe className='video'
                                    title='Youtube player'
                                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                    src={`https://youtube.com/embed/${link.link}?autoplay=0`}>
                                </iframe>

                            </Grid>
                        </>
                    )}


                </Grid>
            </div>
        </>
    );

}