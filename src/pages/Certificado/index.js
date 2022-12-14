import Menu from '../../components/Menu';
import { Grid, Card, Typography, CardContent, RadioGroup, FormLabel, Radio, FormControlLabel } from '@material-ui/core';
import './styles.css'
export default function Certificado() {
    return (
        <>
            <Menu />
            <div class="listar-trajetos-cursos-container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>

                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Lista de todos seus cursos a fazerGenderGenderGenderGenderGenderGenderGenderGenderGenderGenderGenderGender</div>

                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                                    </RadioGroup>
                                </Typography>

                            </CardContent>

                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12}>

                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    <div class="titulo-bv2">Lista de todos seus cursos a fazerGenderGenderGenderGenderGenderGenderGenderGenderGenderGenderGenderGender</div>

                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                                    </RadioGroup>
                                </Typography>

                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}