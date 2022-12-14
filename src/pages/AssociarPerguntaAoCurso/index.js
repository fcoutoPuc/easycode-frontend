import Menu from '../../components/Menu';
import { Grid, Checkbox, Card, Typography, CardContent, RadioGroup, FormLabel, Radio, FormControlLabel, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import './styles.css'
export default function AssociarPerguntaAoCurso() {
    const { cursoId } = useParams();
    const [perguntas, setPerguntas] = useState([]);
    const [pergSeleci, setPergSeleci] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get(`/pergunta`);
            console.log(response.data);
            setPerguntas(response.data);



        }
        fetchData()
            .catch(console.error);

    }, [])

    async function handleChange1(id, index) {
        console.log(index);

        const jaFoiAdicionado = pergSeleci.findIndex(each => each.p_id === id);
        if (jaFoiAdicionado === -1) {
            console.log('n foi adicioano');
            setPergSeleci([...pergSeleci, { p_id: id, ordem: index }])
        } else {
            const result = pergSeleci.filter(each => each.p_id !== id);
            setPergSeleci(result);
        }

    }

    async function handleCriarTrajeto(e) {
        e.preventDefault();
        console.log('oi');
        const cursoID = cursoId;
        console.log(pergSeleci);
        let perguntasIds = pergSeleci.map(it => it.p_id);
        const data = {
            perguntasIds,
            cursosId: cursoID
        };
        try {
            await api.post('pergunta/curso', data)
            alert(`Perguntas Associadas Com Sucesso`);
        } catch (e) {
            console.log(e);
            alert(`${e}`);
        }

    }

    return (
        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>Associar Perguntas</h1>
                
            </div>
   
            <div class="listar-trajetos-cursos-container">
                <form onSubmit={handleCriarTrajeto}>


                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>

                            {perguntas.map((p, index) =>
                                <div class="cada">

                                    <Checkbox onChange={e => handleChange1(p.id, index)} />
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>

                                            <Typography variant="h5" component="div">
                                                <div class="titulo-bv2">{p.pergunta}</div>

                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                <FormLabel component="legend"></FormLabel>
                                                <RadioGroup aria-label="gender" name="gender1" >
                                                    <FormControlLabel value="female" control={<Radio />} disabled label={p.a} />
                                                    <FormControlLabel value="female" control={<Radio />} disabled label={p.b} />
                                                    <FormControlLabel value="female" control={<Radio />} disabled label={p.c} />
                                                    <FormControlLabel value="female" control={<Radio />} disabled label={p.d} />
                                                    <FormControlLabel value="female" control={<Radio />} disabled label={p.e} />

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
                        Associar Perguntas
                        </Button>
                </form>
            </div>

            {/* <Button
                className="finalizar-trajeto-btn"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"

            >
                Associar Perguntas
            </Button> */}
        </>
    )
}