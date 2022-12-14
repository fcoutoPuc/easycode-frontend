import { AppBar, Typography, Toolbar, Button, Box } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/Help';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useNavigate } from "react-router-dom";
export default function Menu() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EasyCode
                        </Typography>
                    <CodeIcon />
                <div class="items-menu">
                        <Button onClick={() => {
                            navigate(`/curso/new`);
                        }} color="inherit">
                            Criar Curso
                             <NoteAddIcon />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/trajeto/new`);
                        }} color="inherit">
                            Criar Trajeto
                            <CreateNewFolderIcon />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/aluno/material`);
                        }} color="inherit">
                            Em Andamento
                            <BatteryCharging60Icon />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/trajeto/cursos`);
                        }} color="inherit">
                            Explorar
                            <SearchIcon />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/pergunta/new`);
                        }} color="inherit">
                            Criar Pergunta
                            <HelpIcon />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/indicadores`);
                        }} color="inherit">
                            
                            <AssessmentIcon />
                        </Button>

                        <Button onClick={() => {
                            localStorage.clear();
                            navigate('/')
                        }} variant="contained" color="secondary" >
                            <ExitToAppIcon />

                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
