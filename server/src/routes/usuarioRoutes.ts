import { Router } from "express";
import { usuarioController } from '../controllers/usuarioControllers';

class UsuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }


    
    //rutas para acciones 
    config(): void {
        this.router.post('/create', usuarioController.create); // Nota que no se usa /api aquí
        this.router.delete('/:Id_Usuario', usuarioController.delete);
        this.router.put('/:Id_Usuario', usuarioController.update);
        this.router.get('/', usuarioController.getUsuarios);
        this.router.get('/:id', usuarioController.getUsuarioById);
        this.router.post('/login', usuarioController.login);
    }
}

export const usuarioRoutes = new UsuarioRoutes().router;
/* const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router; */