import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateBookController } from './controllers/book/CreateBookController';

import { isAuthenticated } from "./middlewares/isAutheticated";
import { UpdateUserController } from './controllers/user/UpdateUserController';

import uploadConfig from './config/multer';
import { UpdateBookController } from './controllers/book/UpdateBookController';
import { CreateFavoriteBooksController } from './controllers/favoriteBooks/CreateFavoriteBooksController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

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
router.post('/books', isAuthenticated, upload.single('file'), new CreateBookController().handle);
// atualizar dados do livro
router.put('/books', isAuthenticated, upload.single('file'), new UpdateBookController().handle);


// ROTAS LIVROS FAVORITOS

// Adicionar livro como favorito
router.post('/books/favorite', isAuthenticated, new CreateFavoriteBooksController().handle);

// ROTAS ARQUIVOS ESTÁTICOS
// /files/nome_do_arquivo
export { router };