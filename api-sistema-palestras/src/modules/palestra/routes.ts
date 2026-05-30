import { Router } from 'express';
import palestraController from './controller';

const router = Router();

router.post('/admin', (req, res) => palestraController.criar(req, res));
router.get('/palestras', (req, res) => palestraController.listar(req, res));
router.get('/palestras/:id', (req, res) => palestraController.obterPorId(req, res));
router.put('/palestras/:id', (req, res) => palestraController.atualizar(req, res));
router.delete('/palestras/:id', (req, res) => palestraController.deletar(req, res));

export default router;
