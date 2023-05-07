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
import { DeleteFavoriteBooksController } from './controllers/favoriteBooks/DeleteFavoriteBooksController';
import { ListBookController } from './controllers/book/ListBookController';
import { SearchBookController } from './controllers/book/SearchBookController';

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
// listar livros
router.get('/books', isAuthenticated, new ListBookController().handle);
// buscar livros
router.get('/books/search', isAuthenticated, new SearchBookController().handle);

// ROTAS LIVROS FAVORITOS

// Adicionar livro como favorito
router.post('/books/favorite', isAuthenticated, new CreateFavoriteBooksController().handle);
// Deleter livro favorito
router.delete('/books/favorite', isAuthenticated, new DeleteFavoriteBooksController().handle);


// ROTAS ARQUIVOS ESTÁTICOS
// /files/nome_do_arquivo
export { router };