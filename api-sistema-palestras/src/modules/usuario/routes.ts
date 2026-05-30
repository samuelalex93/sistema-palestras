import { Router } from 'express';
import usuarioController from './controller';

const router = Router();

router.post('/cadastro', (req, res) => usuarioController.cadastrar(req, res));
router.post('/login', (req, res) => usuarioController.login(req, res));
router.get('/usuarios/:id', (req, res) => usuarioController.obterPorId(req, res));
router.get('/usuarios', (req, res) => usuarioController.listarTodos(req, res));

export default router;
