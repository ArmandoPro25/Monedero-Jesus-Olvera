"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = void 0;
const express_1 = require("express");
const usuarioControllers_1 = require("../controllers/usuarioControllers");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //rutas para acciones 
    config() {
        this.router.post('/create', usuarioControllers_1.usuarioController.create); // Nota que no se usa /api aquí
        this.router.delete('/:Id_Usuario', usuarioControllers_1.usuarioController.delete);
        this.router.put('/:Id_Usuario', usuarioControllers_1.usuarioController.update);
        this.router.get('/', usuarioControllers_1.usuarioController.getUsuarios);
        this.router.get('/:id', usuarioControllers_1.usuarioController.getUsuarioById);
        this.router.post('/login', usuarioControllers_1.usuarioController.login);
    }
}
exports.usuarioRoutes = new UsuarioRoutes().router;
/* const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router; */ 
