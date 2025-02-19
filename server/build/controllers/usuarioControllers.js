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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    // Método para registrar un nuevo usuario
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellido, email, Ocupacion, password, confirmar_password, Id_TipoUser } = req.body;
                // Verificar si las contraseñas coinciden
                if (password !== confirmar_password) {
                    res.status(400).json({ message: 'Las contraseñas no coinciden' });
                    return;
                }
                // Encriptar la contraseña antes de guardarla en la base de datos
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = {
                    nombre,
                    apellido,
                    email,
                    Ocupacion,
                    password: hashedPassword, // Guardar la contraseña encriptada
                    confirmar_password: hashedPassword, // Guardar la contraseña confirmada encriptada
                    Id_TipoUser
                };
                // Insertar el nuevo usuario en la base de datos
                const [result] = yield (yield database_1.default).query('INSERT INTO Usuario SET ?', [newUser]);
                res.status(201).json({ message: 'Usuario registrado con éxito' });
            }
            catch (error) {
                console.error('Error al registrar el usuario:', error);
                res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
            }
        });
    }
    // Método para borrar un usuario por su ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id_Usuario } = req.params;
                const [result] = yield (yield database_1.default).query('DELETE FROM Usuario WHERE Id_Usuario = ?', [Id_Usuario]);
                if (result.affectedRows > 0) {
                    res.json({ message: 'Usuario eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al eliminar el usuario:', error);
                res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
            }
        });
    }
    // Método para actualizar un usuario por su ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id_Usuario } = req.params;
                const usuarioActualizado = req.body;
                // Verificar si la contraseña se está actualizando y encriptarla si es necesario
                if (usuarioActualizado.password) {
                    usuarioActualizado.password = yield bcrypt_1.default.hash(usuarioActualizado.password, 10);
                }
                const [result] = yield (yield database_1.default).query('UPDATE Usuario SET ? WHERE Id_Usuario = ?', [usuarioActualizado, Id_Usuario]);
                if (result.affectedRows > 0) {
                    res.json({ message: 'Usuario actualizado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al actualizar el usuario:', error);
                res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
            }
        });
    }
    // Método para consultar todos los usuarios
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [usuarios] = yield (yield database_1.default).query('SELECT * FROM Usuario');
                res.json(usuarios);
            }
            catch (error) {
                console.error('Error al consultar los usuarios:', error);
                res.status(500).json({ message: 'Error al consultar los usuarios', error: error.message });
            }
        });
    }
    // Consultar un usuario por ID
    getUsuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [rows] = yield (yield database_1.default).query('SELECT * FROM Usuario WHERE Id_Usuario = ?', [id]);
                if (rows.length > 0) {
                    res.json(rows[0]);
                }
                else {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al consultar el usuario:', error);
                res.status(500).json({ message: 'Error al consultar el usuario', error: error.message });
            }
        });
    }
    // Método para el login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'Por favor, ingrese correo y contraseña' });
                return;
            }
            try {
                const [rows] = yield (yield database_1.default).query('SELECT * FROM Usuario WHERE email = ?', [email]);
                const usuario = rows[0];
                if (usuario) {
                    const validPassword = yield bcrypt_1.default.compare(password, usuario.password);
                    if (validPassword) {
                        const token = jsonwebtoken_1.default.sign({ id: usuario.Id_Usuario }, 'secretkey', { expiresIn: '1h' });
                        res.json({ token });
                    }
                    else {
                        res.status(401).json({ message: 'Contraseña incorrecta' });
                    }
                }
                else {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al intentar iniciar sesión:', error);
                res.status(500).json({ message: 'Error al intentar iniciar sesión', error: error.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
exports.default = exports.usuarioController;
