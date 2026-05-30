import { Router } from 'express';
import inscricaoController from './controller';

const router = Router();

router.post('/inscricao', (req, res) => inscricaoController.criar(req, res));
router.get('/inscricoes', (req, res) => inscricaoController.listar(req, res));
router.get('/inscricoes/:id', (req, res) => inscricaoController.obterPorId(req, res));
router.get('/inscricoes/usuario/:idUsuario', (req, res) => inscricaoController.listarPorUsuario(req, res));
router.get('/inscricoes/palestra/:idPalestra', (req, res) => inscricaoController.listarPorPalestra(req, res));
router.delete('/inscricoes/:id', (req, res) => inscricaoController.deletar(req, res));

export default router;
