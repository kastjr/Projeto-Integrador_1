import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateBookController } from './controllers/book/CreateBookController';

import { isAuthenticated } from "./middlewares/isAutheticated";
import { UpdateUserController } from './controllers/user/UpdateUserController';

const router = Router();

// ROTAS USER 

// cadastro do usuário
router.post('/users', new CreateUserController().handle);
// login do usuário
router.post('/session', new AuthUserController().handle);
// detalhes do usuário - perfil
router.get('/me', isAuthenticated, new DetailUserController().handle);
// atualizar dados do usuário
router.put('/me', isAuthenticated, new UpdateUserController().handle);


// ROTAS BOOK

//cadastro de livro
router.post('/books', isAuthenticated, new CreateBookController().handle);

export { router };