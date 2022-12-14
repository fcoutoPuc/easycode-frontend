import './styles.css'
import { Divider, Grid, Drawer, InputLabel, Select, MenuItem, Card, CardContent, Typography, CardActions, Button, Box, Checkbox } from '@material-ui/core';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Menu from '../../components/Menu';
import DnsIcon from '@material-ui/icons/Dns';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DescriptionIcon from '@material-ui/icons/Description';


export default function ListarTrajetosECursos() {
    const [tipo, setTipo] = useState('');
    const [dificuldade, setDificuldade] = useState('');
    const [topico, setTopico] = useState('');
    const [materialListado, setMaterialListado] = useState([]);
    const [materialASerExibido, setMaterialASerExibido] = useState([]);
    const [cursosETrajetosSelecionados, setCursosETrajetosSelecionados] = useState([]);
    const email = localStorage.getItem('email');
    const [drawerOpen, setDrawerOpen] = useState(false);
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

    const handleClose = () => {
        setDrawerOpen(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            const responseTrajeto = await api.get('trajeto');

            for (let element of responseTrajeto.data) {
                element.tipo = 'trajeto'
            }
            const responseCurso = await api.get('curso');
            for (let element of responseCurso.data) {
                element.tipo = 'curso'
            }
            let result = responseCurso.data.concat(responseTrajeto.data);
            console.log(result);
            // filtrar o que ele já fez
            const cursosETrajetosAluno = await api.get(`/aluno/allInfo/${email}`);
            let materiFinalizado = {};
            materiFinalizado.cursos = cursosETrajetosAluno.data.cursos;
            materiFinalizado.trajeto = cursosETrajetosAluno.data.trajeto;
            console.log(materiFinalizado);
            let realResult = [];
            result.forEach(r => {
                if (materiFinalizado.cursos.findIndex(c => c.id === r.id) < 0 && materiFinalizado.trajeto.findIndex(c => c.id === r.id) < 0) {
                    realResult.push(r)
                }

            })
            console.log(result);
            setMaterialListado(realResult);

        }
        fetchData()
            .catch(console.error);

    }, [])

    async function handleTipo(e) {
        setTipo(e);
        let result = materialListado.filter(it => it.tipo === e);
        if (dificuldade !== '' && result.length > 0) {
            result = result.filter(it => it.dificuldade === dificuldade);
        }
        if (topico !== '' & result.length > 0) {
            result = result.filter(it => it.topico_nome === topico);
        }
        setMaterialASerExibido(result)
    }

    async function handleDificulade(e) {
        setDificuldade(e);
        let result = materialListado.filter(it => it.dificuldade === e);
        if (tipo !== '' && result.length > 0) {
            result = result.filter(it => it.tipo === tipo);
        }
        if (topico !== '' & result.length > 0) {
            result = result.filter(it => it.topico_nome === topico);
        }
        setMaterialASerExibido(result)
    }

    async function handleTopico(e) {
        console.log(e);
        console.log(materialListado);
        setTopico(e);
        let result = materialListado.filter(it => it.topico_nome === e);
        if (tipo !== '' && result.length > 0) {
            console.log('entrou');
            result = result.filter(it => it.tipo === tipo);
        }
        if (dificuldade !== '' & result.length > 0) {
            console.log('entrou');
            result = result.filter(it => it.dificuldade === dificuldade);
        }
        setMaterialASerExibido(result)
        console.log(result);
    }

    async function handleAssociarCursoETrajeto(material) {
        console.log(material);
        const jaFoiAdicionado = cursosETrajetosSelecionados.findIndex(each => each.id === material.id);
        console.log(jaFoiAdicionado);
        if (jaFoiAdicionado === -1) {
            setCursosETrajetosSelecionados([...cursosETrajetosSelecionados, material])
        } else {
            const result = cursosETrajetosSelecionados.filter(each => each.id !== material.id);
            setCursosETrajetosSelecionados(result);
        }
    }

    async function saveAssociationsInAccount(e) {
        e.preventDefault();
        console.log(cursosETrajetosSelecionados);
        const curso_ids = [];
        cursosETrajetosSelecionados.forEach(each => {
            if (each.tipo === 'curso') {
                curso_ids.push(each.id);
            }
        });
        const trajeto_ids = [];
        cursosETrajetosSelecionados.forEach(each => {
            if (each.tipo === 'trajeto') {
                trajeto_ids.push(each.id);
            }
        });
        const email = localStorage.getItem('email');
        const data = {
            aluno_email: email,
            curso_ids,
            trajeto_ids
        };
        try {
            await api.post('aluno/associate', data);
            alert(`O Material foi associado com sucesso`);
        } catch (e) {
            console.log(e);
            alert(`${e}`);
        }
    }



    return (
        <>
            <Menu />
            <div class="listar-trajetos-cursos-container">

                <form onSubmit={saveAssociationsInAccount}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>

                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>

                                    <Typography variant="h5" component="div">
                                        <div class="titulo-bv2">
                                            Selecione aqui o curso ou trajeto que deseja realizar
                                        </div>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {/* A diferença entre um curso e um trajeto é que o curso é um módulo úncio sobre um tema específico, enquanto o trajeto é algo mais completo, englobando diversos cursos co-relacionados */}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>

                        <Grid item xs={4} sm={4}>

                            <InputLabel  >Selecione o topico que deseja aprender</InputLabel>
                            <Select

                                className="select-listagem"
                                label="Topico"
                                onChange={e => handleTopico(e.target.value)}
                            >
                                <MenuItem value="NodeJs">NodeJs</MenuItem>
                                <MenuItem value="Java">Java</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={4} sm={4}>

                            <InputLabel  >Selecione a dificuldade desejada</InputLabel>
                            <Select
                                className="select-listagem"
                                label="Topico"
                                onChange={e => handleDificulade(e.target.value)}
                            >
                                <MenuItem value="Facil">Fácil</MenuItem>
                                <MenuItem value="Medio">Médio</MenuItem>
                                <MenuItem value="Dificil">Difícil</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={4} sm={4}>

                            <InputLabel  >Selecione entre curso ou trajeto</InputLabel>
                            <Select

                                className="select-listagem"
                                label="Topico"
                                onChange={e => handleTipo(e.target.value)}
                            >
                                <MenuItem value="curso">Curso</MenuItem>
                                <MenuItem value="trajeto">Trajeto</MenuItem>

                            </Select>
                        </Grid>



                        {materialASerExibido.map((material, index) => (
                            <>

                                <Grid item xs={4} sm={4}>
                                    <Checkbox onChange={e => handleAssociarCursoETrajeto(material)} />
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Topico: {material.topico_nome}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {material.nome}
                                            </Typography>


                                            {(material.dificuldade === 'Facil' || material.dificuldade === 'Fácil') &&
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    <div class="dif-facil">
                                                        Dificuldade:
                                                        <br></br>
                                                        <FiberManualRecordIcon />
                                                    </div>

                                                </Typography>
                                            }
                                            {material.dificuldade === 'Medio' &&
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    <div class="dif-medio">
                                                        Dificuldade:
                                                        <br></br>
                                                        <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                    </div>

                                                </Typography>
                                            }

                                            {material.dificuldade === 'Dificil' &&
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    <div class="dif-dificil">
                                                        Dificuldade:
                                                        <br></br>
                                                        <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                    </div>

                                                </Typography>
                                            }



                                            <Typography variant="body1">
                                                Tipo: {material.tipo}
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => { toogleDrawerDraw(material.nome, material.descricao, material.topico_nome, material.dificuldade, `Detalhes do ${material.tipo}`) }} size="small">Detalhes</Button>
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
                                    </Card>
                                </Grid>
                            </>
                        ))}

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="cadastro-btn"
                        sx={{ mt: 100, mb: 2 }}
                    >
                        Associar
            </Button>

                </form>
            </div >
        </>)
}
