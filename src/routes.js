import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cadastro from './pages/Cadastro';
import TrajetoAluno from './pages/TrajetoAluno';
import Login from './pages/Login';
import CadastroCurso from './pages/CadastrarCurso';
import CadastrarTrajeto from './pages/CadastrarTrajeto';
import ListarTrajetosECursos from './pages/ListarTrajetosECursos';
import ListarCursosETrajetosAluno from './pages/ListarCursosETrajetosAluno';
import FazerCurso from './pages/FazerCurso';
import FazerTrajeto from './pages/FazerTrajeto';
import Certificado from './pages/Certificado';
import VerCursoPeloTrajeto from './pages/VerCursoPeloTrajeto';
import CriarPergunta from './pages/CriarPergunta';
import Indicadores from './pages/Indicadores';
import AssociarPerguntaAoCurso from './pages/AssociarPerguntaAoCurso';
import FazerTesteCurso from './pages/FazerTesteCurso';

export default function AllRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Cadastro />} />
                <Route path="/trajeto/aluno" exact element={<TrajetoAluno />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/curso/new" exact element={<CadastroCurso />} />
                <Route path="/trajeto/new" exact element={<CadastrarTrajeto />} />
                <Route path="/trajeto/cursos" exact element={<ListarTrajetosECursos />} />
                <Route path="/aluno/material" exact element={<ListarCursosETrajetosAluno />} />
                <Route path="/curso/:cursoId" exact element={<FazerCurso />} />
                <Route path="/curso/:cursoId/trajeto" exact element={<VerCursoPeloTrajeto />} />
                <Route path="/trajeto/:trajetoId" exact element={<FazerTrajeto />} />
                <Route path="/certificado" exacxt element={<Certificado />} />
                <Route path="/indicadores" exact element={<Indicadores />} />
                <Route path="/pergunta/new" exact element={<CriarPergunta />} />
                <Route path="/pergunta/curso/:cursoId" exact element={<AssociarPerguntaAoCurso />} />
                <Route path="/curso/teste/:cursoId" exact element={<FazerTesteCurso />} />
            </Routes>
        </BrowserRouter>
    );
}

