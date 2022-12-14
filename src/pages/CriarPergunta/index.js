import './styles.css'
import Menu from '../../components/Menu';
import { Grid, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, Button } from '@material-ui/core';
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";
export default function CriarPergunta() {
    const navigate = useNavigate();
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [selectedValue, setSelectedValue] = useState('A');
    const [correta, setCorreta] = useState('');
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    async function handleCriarTrajeto(e) {
        e.preventDefault();
        console.log(alternativaA);
        console.log(alternativaB);
        console.log(alternativaC);
        console.log(alternativaD);
        console.log(alternativaE);
        console.log(pergunta);
        console.log(selectedValue.toLowerCase());
        const data = {
            pergunta,
            a: alternativaA,
            b: alternativaB,
            c: alternativaC,
            d: alternativaD,
            e: alternativaE,
            correta: selectedValue.toLowerCase()

        }

        try {
            console.log('entrou aqui');
            const response = await api.post('pergunta/new', data);
            alert(`Pergunta Criada`);
            navigate('/curso/new')
            console.log(response);
            
        } catch (e) {
            console.log(e);
            alert(`${e}`);
        }

    };


    return (
        <>
            <Menu />
            <div class="titulo-bv2">
                <h1>Criar Pergunta</h1>
            </div>


            <div class="listar-trajetos-cursos-container">
                <form onSubmit={handleCriarTrajeto}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Pergunta"
                                autoFocus
                                value={pergunta}
                                onChange={e => setPergunta(e.target.value)}


                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Alternativa A"
                                autoFocus
                                value={alternativaA}
                                onChange={e => setAlternativaA(e.target.value)}


                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Alternativa B"
                                autoFocus
                                value={alternativaB}
                                onChange={e => setAlternativaB(e.target.value)}


                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Alternativa C"
                                autoFocus
                                value={alternativaC}
                                onChange={e => setAlternativaC(e.target.value)}


                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Alternativa D"
                                autoFocus
                                value={alternativaD}
                                onChange={e => setAlternativaD(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                fullWidth
                                label="Alternativa E"
                                autoFocus
                                value={alternativaE}
                                onChange={e => setAlternativaE(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormLabel component="legend">Resposta Correta</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" >
                                <FormControlLabel value="A" control={<Radio checked={selectedValue === 'A'} onChange={handleChange} />} label="A" />
                                <FormControlLabel value="B" control={<Radio checked={selectedValue === 'B'} onChange={handleChange} />} label="B" />
                                <FormControlLabel value="C" control={<Radio checked={selectedValue === 'C'} onChange={handleChange} />} label="C" />
                                <FormControlLabel value="D" control={<Radio checked={selectedValue === 'D'} onChange={handleChange} />} label="D" />
                                <FormControlLabel value="E" control={<Radio checked={selectedValue === 'E'} onChange={handleChange} />} label="E" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="cadastro-btn"
                        sx={{ mt: 100, mb: 2 }}

                    >
                        Criar Pergunta
                        </Button>
                </form>
            </div>
        </>
    )
}