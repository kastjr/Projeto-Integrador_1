import { Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

// ROTAS USER 

// cadastro do usuário
router.post('/users', new CreateUserController().handle);
// autenticação do usuário
router.post('/session', new AuthUserController().handle);

export { router };