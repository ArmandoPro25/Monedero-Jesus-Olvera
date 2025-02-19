"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ejecutar la consulta y recibir el resultado
                const result = yield database_1.default.query('SELECT * FROM usuario');
                // Hacer una aserción de tipo para rows
                const [rows] = result;
                res.json(rows);
            }
            catch (err) {
                res.status(500).json({ error: 'Error al listar usuarios', details: err });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validar y sanitizar los datos
                const { nombre, apellido, email, ocupacion, password, Id_TipoUser } = req.body;
                if (!nombre || !apellido || !email || !ocupacion || !password || !Id_TipoUser) {
                    res.status(400).json({ error: 'Todos los campos son requeridos' });
                    return;
                }
                // Validar el formato del correo electrónico (opcional)
                if (!/\S+@\S+\.\S+/.test(email)) {
                    res.status(400).json({ error: 'El correo electrónico no es válido' });
                    return;
                }
                // Ejecutar la consulta de inserción
                const result = yield database_1.default.query('INSERT INTO usuario SET ?', {
                    nombre,
                    apellido,
                    email,
                    ocupacion,
                    password,
                    Id_TipoUser
                });
                // Verificar el resultado
                if (result) {
                    res.json({ message: 'Usuario agregado exitosamente' });
                }
                else {
                    res.status(500).json({ error: 'No se pudo agregar el usuario' });
                }
            }
            catch (err) {
                // Manejo de errores específico
                if (err instanceof Error) {
                    console.error('Error al crear usuario:', err.message);
                    res.status(500).json({ error: 'Error al crear usuario', details: err.message });
                }
                else {
                    // Manejo de errores desconocidos
                    console.error('Error desconocido al crear usuario:', err);
                    res.status(500).json({ error: 'Error desconocido al crear usuario' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                yield database_1.default.query('DELETE FROM usuario WHERE Id_Usuario = ?', [idUser]);
                res.json({ message: 'Usuario eliminado' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al eliminar usuario', details: err });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                yield database_1.default.query('UPDATE usuario SET ? WHERE Id_Usuario = ?', [req.body, idUser]);
                res.json({ message: 'Usuario modificado' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al modificar usuario', details: err });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE Id_Usuario = ?', [idUser]);
                console.log('Tipo de result:', typeof result);
                console.log('Resultado:', result);
                const [rows] = result;
                if (Array.isArray(rows) && rows.length > 0) {
                    res.json(rows[0]);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (error) {
                res.status(500).json({ text: 'Error en la consulta', error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body; // Cambiado a req.body
                if (!email || !password) {
                    res.status(400).json({ message: 'Email y contraseña son requeridos' });
                    return;
                }
                // Ejecutar la consulta
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password]);
                // Hacer una aserción de tipo para rows
                const [rows] = result;
                if (rows.length > 0) {
                    res.status(200).json({ message: "Usuario bienvenido" });
                }
                else {
                    res.status(401).json({ message: "Credenciales inválidas" });
                }
            }
            catch (error) {
                console.error("Error al ingresar:", error);
                res.status(500).json({ message: "Error interno en el servidor", details: error });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
exports.default = exports.usuarioController;
