
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Divider, Typography, Toolbar, Drawer, Grid, Card, CardContent, CardActions, Button, Box, Checkbox } from '@material-ui/core';
import FourKIcon from '@material-ui/icons/FourK';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DescriptionIcon from '@material-ui/icons/Description';
import DnsIcon from '@material-ui/icons/Dns';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import './styles.css'
import Menu from '../../components/Menu';
import { useNavigate } from "react-router-dom";
export default function ListarCursosETrajetosAluno() {
    const [material, setMaterial] = useState([]);
    const [materialFinalizado, setMaterialFinalizado] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const nome = localStorage.getItem('nome');
    const email = localStorage.getItem('email');


    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerOpenTrajeto, setDrawerOpenTrajeto] = useState(false);
    const [drawerInfo, setDrawerInfo] = useState({});
    async function toogleDrawerDraw(nome, descricao, topico_nome, dificuldade, titulo) {
        //console.log(data);
        setDrawerInfo({
            nome,
            descricao,
            topico_nome,
            dificuldade,
            titulo
        })
        setDrawerOpen(true)
    }



    const toogleDrawerDrawTrajeto = () => {
        console.log('oi');
        setDrawerOpenTrajeto(true)
    }

    const handleCloseTrajeto = () => {
        setDrawerOpenTrajeto(false)
    };

    const handleClose = () => {
        setDrawerOpen(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            const cursosETrajetosAluno = await api.get(`/aluno/allInfo/${email}`);
            console.log(cursosETrajetosAluno.data);
            let materi = {}
            materi.cursos = cursosETrajetosAluno.data.cursos.filter(each => each.finalizado === 0);
            materi.trajeto = cursosETrajetosAluno.data.trajeto.filter(each => each.finalizado === 0);
            setMaterial(materi);
            let materiFinalizado = {};
            materiFinalizado.cursos = cursosETrajetosAluno.data.cursos.filter(each => each.finalizado === 1);
            materiFinalizado.trajeto = cursosETrajetosAluno.data.trajeto.filter(each => each.finalizado === 1);
            console.log(materiFinalizado);
            setMaterialFinalizado(materiFinalizado);

            console.log(material);
        }
        fetchData()
            .catch(console.error);

    }, [])
    return (
        <>



            <Menu />

            <div class="titulo-bv">
                <h1>Olá {nome}, Bem vindo!</h1>

            </div>



            <div class="listar-trajetos-cursos-container">

                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>

                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>

                                    <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Lista de todos seus cursos a fazer</div>
                                        
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {/* A diferença entre um curso e um trajeto é que o curso é um módulo úncio sobre um tema específico, enquanto o trajeto é algo mais completo, englobando diversos cursos co-relacionados */}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>



                        <>

                            {material.cursos?.map((mat, index) =>

                                <Grid item xs={4} sm={4}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Topico: {mat.topico_nome}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {mat.nome}
                                            </Typography>

                                            <Grid container spacing={2}>
                                                <Grid item xs={6} sm={6}>
                                                    {(mat.dificuldade === 'Facil' || mat.dificuldade === 'Fácil') &&
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <div class="dif-facil">
                                                                Dificuldade:
                                                        <br></br>
                                                                <FiberManualRecordIcon />
                                                            </div>

                                                        </Typography>
                                                    }
                                                    {mat.dificuldade === 'Medio' &&
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <div class="dif-medio">
                                                                Dificuldade:
                                                        <br></br>
                                                                <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                            </div>

                                                        </Typography>
                                                    }

                                                    {mat.dificuldade === 'Dificil' &&
                                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                            <div class="dif-dificil">
                                                                Dificuldade:
                                                        <br></br>
                                                                <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                            </div>

                                                        </Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={6} sm={6}>
                                                    <Typography>

                                                        <div class="dif-">
                                                            STATUS: <br /> <AccessTimeIcon />

                                                        </div>
                                                    </Typography>
                                                </Grid>


                                            </Grid>

                                        </CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} sm={6}>
                                                <CardActions>
                                                    <Button onClick={() => {
                                                        navigate(`/curso/${mat.id}`)
                                                    }}
                                                        size="small">Fazer</Button>
                                                </CardActions>
                                            </Grid>

                                            <Grid item xs={6} sm={6}>

                                                <CardActions>
                                                    <Button onClick={() => { toogleDrawerDraw(mat.nome, mat.descricao, mat.topico_nome, mat.dificuldade, 'Detalhes Do Curso') }}
                                                        size="small">Detalhes</Button>
                                                </CardActions>
                                                <Drawer className="drawerClass" open={drawerOpen} onClose={handleClose}>

                                                    <div class="dratitle">
                                                        <h1> {drawerInfo.titulo}:</h1>
                                                    </div>

                                                    <div class="drawerDetails">
                                                        <div class="eachItemDraw">
                                                            <div class="eachItemTitle">
                                                                <h2>Nome <DnsIcon /></h2>

                                                            </div>
                                                            <Typography>{drawerInfo.nome}</Typography>
                                                        </div>
                                                        <Divider />
                                                        <div class="eachItemDraw">
                                                            <div class="eachItemTitle">
                                                                <h2> Descrição <DescriptionIcon ></DescriptionIcon></h2>
                                                            </div>
                                                            <Typography > {drawerInfo.descricao}</Typography>
                                                        </div>

                                                        <Divider />

                                                        <div class="eachItemDraw">
                                                            <div class="eachItemTitle">
                                                                <h2> Topico <FormatListBulletedIcon /></h2>
                                                            </div>
                                                            <Typography >


                                                                {drawerInfo.topico_nome}
                                                            </Typography>

                                                        </div>
                                                        <Divider />

                                                        <div class="eachItemDraw">
                                                            <div class="eachItemTitle">
                                                                <h2> Dificuldade <HelpIcon /></h2>

                                                            </div>

                                                            <Typography >{drawerInfo.dificuldade}</Typography>
                                                        </div>


                                                    </div>



                                                </Drawer>

                                            </Grid>
                                        </Grid>

                                    </Card>
                                </Grid>

                            )}

                        </>



                        <Grid item xs={12} sm={12}>

                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>

                                    <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Lista de todos seus trajetos a fazer </div>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {/* A diferença entre um curso e um trajeto é que o curso é um módulo úncio sobre um tema específico, enquanto o trajeto é algo mais completo, englobando diversos cursos co-relacionados */}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>

                        {material.trajeto?.map((mat, index) =>

                            <Grid item xs={4} sm={4}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {mat.topico_nome}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {mat.nome}
                                        </Typography>


                                        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Dificuldade: {mat.dificuldade}
                                        </Typography> */}

                                        <Grid container spacing={2}>
                                            <Grid item xs={6} sm={6}>
                                                {(mat.dificuldade === 'Facil' || mat.dificuldade === 'Fácil') &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-facil">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                                {mat.dificuldade === 'Medio' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-medio">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }

                                                {mat.dificuldade === 'Dificil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-dificil">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Typography>

                                                    <div class="dif-">
                                                        STATUS: <br /> <AccessTimeIcon />

                                                    </div>
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} sm={6}>


                                            <Button onClick={() => {
                                                navigate(`/trajeto/${mat.id}`)
                                            }} size="small">Fazer</Button>

                                        </Grid>
                                        <Grid item xs={6} sm={6}>

                                            <Button onClick={() => { toogleDrawerDraw(mat.nome, mat.descricao, mat.topico_nome, mat.dificuldade, 'Detalhes Do Trajeto') }}
                                                size="small">Detalhes</Button>
                                        </Grid>
                                        <Drawer className="drawerClass" open={drawerOpenTrajeto} onClose={handleCloseTrajeto}>
                                            <div class="dratitle">
                                                <h1> {drawerInfo.titulo}:</h1>
                                            </div>

                                            <div class="drawerDetails">
                                                <div class="eachItemDraw">
                                                    <div class="eachItemTitle">
                                                        <h2>Nomesss <DnsIcon /></h2>

                                                    </div>
                                                    <Typography>{mat.nome}</Typography>
                                                </div>
                                                <Divider />
                                                <div class="eachItemDraw">
                                                    <div class="eachItemTitle">
                                                        <h2> Descrição <DescriptionIcon ></DescriptionIcon></h2>
                                                    </div>
                                                    <Typography > {mat.descricao}</Typography>
                                                </div>

                                                <Divider />

                                                <div class="eachItemDraw">
                                                    <div class="eachItemTitle">
                                                        <h2> Topico <FormatListBulletedIcon /></h2>
                                                    </div>
                                                    <Typography >


                                                        {mat.topico_nome}
                                                    </Typography>

                                                </div>
                                                <Divider />

                                                <div class="eachItemDraw">
                                                    <div class="eachItemTitle">
                                                        <h2> Dificuldade <HelpIcon /></h2>

                                                    </div>

                                                    <Typography >{mat.dificuldade}</Typography>
                                                </div>


                                            </div>



                                        </Drawer>

                                    </Grid>
                                </Card>
                            </Grid>

                        )}


                        <Grid item xs={12} sm={12}>

                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>

                                    <Typography variant="h5" component="div">
                                    <div class="titulo-bv2"> Materiais Finalizados </div>
                                        
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">

                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>


                        {materialFinalizado.trajeto?.map((mat, index) =>

                            <Grid item xs={4} sm={4}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {mat.topico_nome}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {mat.nome}
                                        </Typography>

                                        <Grid container spacing={2}>


                                            <Grid item xs={6} sm={6}>
                                                {mat.dificuldade === 'Facil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-facil">
                                                            Dificuldade:
                                                     <br></br>
                                                            <FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                                {mat.dificuldade === 'Medio' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-medio">
                                                            Dificuldade:
                                                    <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }

                                                {mat.dificuldade === 'Dificil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-dificil">
                                                            Dificuldade:
                                                    <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                            </Grid>

                                            <Grid item xs={6} sm={6}>
                                                <Typography>

                                                    <div class="dif-facil">
                                                        STATUS: <br /> <CheckCircleIcon />

                                                    </div>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                </Card>
                            </Grid>

                        )}


                        {materialFinalizado.cursos?.map((mat, index) =>

                            <Grid item xs={4} sm={4}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {mat.topico_nome}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {mat.nome}
                                        </Typography>

                                        <Grid container spacing={2}>


                                            <Grid item xs={6} sm={6}>
                                                {mat.dificuldade === 'Facil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-facil">
                                                            Dificuldade:
                                                     <br></br>
                                                            <FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                                {mat.dificuldade === 'Medio' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-medio">
                                                            Dificuldade:
                                                    <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }

                                                {mat.dificuldade === 'Dificil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-dificil">
                                                            Dificuldade:
                                                    <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                            </Grid>

                                            <Grid item xs={6} sm={6}>
                                                <Typography>

                                                    <div class="dif-facil">
                                                        STATUS: <br /> <CheckCircleIcon />

                                                    </div>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    
                                </Card>
                            </Grid>

                        )}



                    </Grid>


                </form>
            </div >
        </>
    )
}