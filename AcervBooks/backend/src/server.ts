import express, { Request, Response, NextFunction } from "express";

import 'express-async-errors';
import cors from 'cors';

import { router } from './routers';

const port = 3333;

const app = express();

// Tipo de dados
app.use(express.json());

// Receber requisições de qualquer IP ou Url
app.use(cors());

// Rotas
app.use(router);

// Tratamento de erros 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        // Se for uma instância do tipo error;
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(port, () => console.log('Servidor online...'));