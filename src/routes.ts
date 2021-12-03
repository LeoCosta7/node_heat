import { Router } from "express";
import { AuthenticateUserController } from "./controllers/authenticateUserController";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle)   //O método handle já recebe o request e response

export { router }


/**express.Router() é um gerenciador/manipulador de rotas do NodeJS. 
 * Ela serve para criar rotas de forma modularizada, assim possibilitando criar um arquivo separado de manipulação de rotas.
 */