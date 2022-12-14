import api from '../../services/api';
import Menu from '../../components/Menu';
import { useState, useEffect } from 'react';
import { Grid, Checkbox, Card, Typography, CardContent, RadioGroup, FormLabel, Radio, FormControlLabel, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function FazerTesteCurso() {
    const { cursoId } = useParams();
    const navigate = useNavigate();

    const [perguntas, setPerguntas] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [respostas, setRespostas] = useState([]);
    const handleChange = (alt, id) => {
        setSelectedValue(alt);
    };
    useEffect(() => {
        const fetchData = async () => {

            const response = await api.get(`/perguntas/curso/${cursoId}`);
            setPerguntas(response.data);
            console.log(response.data);
        }
        fetchData()
            .catch(console.error);

    }, [])

    async function handle1(e, id) {
        console.log(e);
        console.log(id);
        let copia = respostas;
        const jaFoiAdicionado = respostas.findIndex(each => each.pergunta_id === id);
        console.log(jaFoiAdicionado);
        if (jaFoiAdicionado === -1) {
            console.log('entra');
            setRespostas([...respostas, { pergunta_id: id, resposta: e }]);
        } else {
            copia[jaFoiAdicionado].resposta = e;
            setRespostas(copia);
        }
    }

    async function validarTeste(e) {
        e.preventDefault();
        let certas = 0;
        console.log(respostas);
        respostas.forEach(resposta => {
            const index = perguntas.findIndex(each => each.pergunta_id === resposta.pergunta_id);
            if (perguntas[index].correta === resposta.resposta) {
                certas++;
            }
        })
        console.log(certas);

        if (certas >= perguntas.length * 0.8) {
            const email = localStorage.getItem('easycode_email');
            console.log(email);
            console.log(cursoId);
            try {
                await api.post(`curso/finaliza/${email}/${cursoId}`);
                alert(`Curso Finalizado`)
                navigate('/aluno/material');

            } catch (e) {
                console.log(e);
                alert(`${e}`);
            }
        } else {
            alert('Você não atingiu a pontuação necessária')
        }
    }

    return (
        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>Realizar Tessste</h1>
            </div>
            <div class="listar-trajetos-cursos-container">
                <form onSubmit={validarTeste}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            {perguntas.map((p, index) =>
                                <div class="cada">


                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>

                                            <Typography variant="h5" component="div">
                                                <div class="titulo-bv2">{p.pergunta}</div>

                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                <FormLabel component="legend"></FormLabel>
                                                <RadioGroup onChange={(e) => handle1(e.target.value, p.pergunta_id)} aria-label="gender" name="gender1" >
                                                    <FormControlLabel value="a" control={<Radio />} label={p.a} />
                                                    <FormControlLabel value="b" control={<Radio />} label={p.b} />
                                                    <FormControlLabel value="c" control={<Radio />} label={p.c} />
                                                    <FormControlLabel value="d" control={<Radio />} label={p.d} />
                                                    <FormControlLabel value="e" control={<Radio />} label={p.e} />

                                                </RadioGroup>
                                            </Typography>

                                        </CardContent>

                                    </Card>
                                </div>
                            )}

                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="cadastro-btn"
                        sx={{ mt: 100, mb: 2 }}

                    >
                        Responder
                        </Button>
                </form>

            </div>
        </>
    )
}