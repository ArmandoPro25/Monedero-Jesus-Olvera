import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../database";

class UsuarioController {
    // Método para registrar un nuevo usuario
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, apellido, email, Ocupacion, password, confirmar_password, Id_TipoUser } = req.body;

            // Verificar si las contraseñas coinciden
            if (password !== confirmar_password) {
                res.status(400).json({ message: 'Las contraseñas no coinciden' });
                return;
            }

            // Encriptar la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10);

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
            const [result]: any = await (await pool).query('INSERT INTO Usuario SET ?', [newUser]);
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Error al registrar el usuario', error: (error as Error).message });
        }
    }

    // Método para borrar un usuario por su ID
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { Id_Usuario } = req.params;
            const [result]: any = await (await pool).query('DELETE FROM Usuario WHERE Id_Usuario = ?', [Id_Usuario]);

            if (result.affectedRows > 0) {
                res.json({ message: 'Usuario eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ message: 'Error al eliminar el usuario', error: (error as Error).message });
        }
    }

    // Método para actualizar un usuario por su ID
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { Id_Usuario } = req.params;
            const usuarioActualizado = req.body;

            // Verificar si la contraseña se está actualizando y encriptarla si es necesario
            if (usuarioActualizado.password) {
                usuarioActualizado.password = await bcrypt.hash(usuarioActualizado.password, 10);
            }

            const [result]: any = await (await pool).query('UPDATE Usuario SET ? WHERE Id_Usuario = ?', [usuarioActualizado, Id_Usuario]);

            if (result.affectedRows > 0) {
                res.json({ message: 'Usuario actualizado con éxito' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Error al actualizar el usuario', error: (error as Error).message });
        }
    }

    // Método para consultar todos los usuarios
    public async getUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const [usuarios]: any = await (await pool).query('SELECT * FROM Usuario');
            res.json(usuarios);
        } catch (error) {
            console.error('Error al consultar los usuarios:', error);
            res.status(500).json({ message: 'Error al consultar los usuarios', error: (error as Error).message });
        }
    }

    // Consultar un usuario por ID
    public async getUsuarioById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const [rows]: any = await (await pool).query('SELECT * FROM Usuario WHERE Id_Usuario = ?', [id]);

            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al consultar el usuario:', error);
            res.status(500).json({ message: 'Error al consultar el usuario', error: (error as Error).message });
        }
    }

    // Método para el login
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Por favor, ingrese correo y contraseña' });
            return;
        }

        try {
            const [rows]: any = await (await pool).query('SELECT * FROM Usuario WHERE email = ?', [email]);
            const usuario = rows[0];

            if (usuario) {
                const validPassword = await bcrypt.compare(password, usuario.password);

                if (validPassword) {
                    const token = jwt.sign({ id: usuario.Id_Usuario }, 'secretkey', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            res.status(500).json({ message: 'Error al intentar iniciar sesión', error: (error as Error).message });
        }
    }
}

export const usuarioController = new UsuarioController();
export default usuarioController;
