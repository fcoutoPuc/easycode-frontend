import './styles.css'
import { Grid, TextField, InputLabel, Select, MenuItem, Card, CardContent, Typography, CardActions, Button, Divider, Drawer, Checkbox, FormControl } from '@material-ui/core';
import api from '../../services/api';
import { useState } from 'react';
import Menu from '../../components/Menu';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DescriptionIcon from '@material-ui/icons/Description';
import { useNavigate } from "react-router-dom";
import DnsIcon from '@material-ui/icons/Dns';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';


export default function CadastroTrajeto() {
    const navigate = useNavigate();
    const [cursosListados, setCursosListados] = useState([])
    const [cursosSelecionados, setCursosSelecionados] = useState([])
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [topico, setTopico] = useState('');
    const [dificuldade, setDificuldade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerInfo, setDrawerInfo] = useState({});
    const [count, setCount] = useState(0);
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


    async function handleCriarTrajeto(e) {
        e.preventDefault();
        console.log(cursosSelecionados);
        let cursosEmOrdem = cursosSelecionados.sort((a,b) => (a.ordem - b.ordem));
        console.log('em ordem');
        console.log(cursosEmOrdem);
        console.log('fora ordem');
        console.log(cursosSelecionados);
        let cursos = cursosEmOrdem.map((eachCurso, index) => {
            return {
                id_curso: eachCurso.curso_id,
                ordem: index,
            }
        })
        console.log(dificuldade);
        const data = {
            nome,
            dificuldade,
            autor,
            topico_nome: topico,
            cursos,
            descricao
        }
        console.log(data);
        try {
            await api.post('trajeto', data);
            alert(`Trajeto ${nome} Criado`);
            navigate(`/trajeto/cursos`);
        } catch (e) {
            console.log(e);
            alert(`${e}`);
        }
    }
    async function getCursosByTopic(e) {
        const response = await api.get('curso');
        setTopico(e);
        console.log(response.data);
        const result = response.data.filter(each => each.topico_nome === e);
        console.log(result);
        setCursosListados(result)
        console.log(e);
    }

    async function handleChange1(id, index) {
        console.log(index);
        const jaFoiAdicionado = cursosSelecionados.findIndex(each => each.curso_id === id);
        console.log(jaFoiAdicionado);
        if (jaFoiAdicionado === -1) {
            setCursosSelecionados([...cursosSelecionados, { curso_id: id, ordem: count }])
            let newCount  = count + 1;
            setCount(newCount++);

        } else {
            const result = cursosSelecionados.filter(each => each.curso_id !== id);
            setCursosSelecionados(result)
        }
    }


    return (
        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>Criar Trajeto</h1>

            </div>
            <div class="cadastrar-trajeto-container">


                <form onSubmit={handleCriarTrajeto}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Nome do Trajeto"
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
                            
                            <InputLabel id="demo-simple-select-label">Topico do Trajeto</InputLabel>
                            <Select

                                className="select-topico"
                                label="Topico"
                                onChange={e => getCursosByTopic(e.target.value)}

                            >
                                <MenuItem value="NodeJs">NodeJs</MenuItem>
                                <MenuItem value="Java">Java</MenuItem>

                            </Select>

                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <InputLabel id="demo-simple-select-label">Dificuldade</InputLabel>
                            <Select

                                className="select-topico"
                                label="Dificuldade"
                                onChange={e => setDificuldade(e.target.value)}
                            >
                                <MenuItem value="Facil">Fácil</MenuItem>
                                <MenuItem value="Medio">Médio</MenuItem>
                                <MenuItem value="Dificil">Difícil</MenuItem>

                            </Select>

                        </Grid>

                        {cursosListados.map((cursoListado, index) => (
                            <>

                                <Grid item xs={4} sm={4}>
                                    <Checkbox onChange={e => handleChange1(cursoListado.id, index)} />
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {cursoListado.topico_nome}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {cursoListado.nome}
                                            </Typography>
                                            <>

                                                {(cursoListado.dificuldade === 'Facil' || cursoListado.dificuldade === 'Fácil') &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-facil">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                                {cursoListado.dificuldade === 'Medio' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-medio">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }

                                                {cursoListado.dificuldade === 'Dificil' &&
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        <div class="dif-dificil">
                                                            Dificuldade:
                                                        <br></br>
                                                            <FiberManualRecordIcon /><FiberManualRecordIcon /><FiberManualRecordIcon />
                                                        </div>

                                                    </Typography>
                                                }
                                            </>

                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => { toogleDrawerDraw(cursoListado.nome, cursoListado.descricao, cursoListado.topico_nome, cursoListado.dificuldade, 'Detalhes Do Curso') }} size="small">Saber Mais</Button>
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
            </div>
        </>
    )
}