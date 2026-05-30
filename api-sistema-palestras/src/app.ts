import express from 'express';
import cors from 'cors';

import usuarioRoutes from './modules/usuario/routes';
import palestraRoutes from './modules/palestra/routes';
import inscricaoRoutes from './modules/inscricao/routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', usuarioRoutes);
app.use('/api', palestraRoutes);
app.use('/api', inscricaoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;
