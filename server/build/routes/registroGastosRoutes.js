"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/registroGastosRoutes.ts
const express_1 = require("express");
const database1_1 = __importDefault(require("../database1"));
const router = (0, express_1.Router)();
// Ruta para agregar un nuevo gasto
router.post('/add', (req, res) => {
    const { Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario } = req.body;
    const query = 'INSERT INTO RegistroGastos (Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
    database1_1.default.query(query, [Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario], (err, result) => {
        if (err) {
            console.error('Error al insertar gasto:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Gasto agregado correctamente' });
    });
});
// Ruta para obtener todos los gastos
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM RegistroGastos';
    database1_1.default.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los gastos:', err);
            res.status(500).send('Error al obtener los gastos');
            return;
        }
        res.status(200).json(results);
    });
});
//Ruta para obtener un gasto por su ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM RegistroGastos WHERE Id_Gasto = ?';
    database1_1.default.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el gasto:', err);
            return res.status(500).json({ error: 'Error al obtener el gasto' });
        }
        if (Array.isArray(results) && results.length === 0) {
            return res.status(404).json({ error: 'Gasto no encontrado' });
        }
        res.status(200).json(results[0]);
    });
});
// Ruta para eliminar un registro de gasto
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM RegistroGastos WHERE Id_Gasto = ?';
    database1_1.default.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el gasto:', err);
            res.status(500).json({ error: 'Error al eliminar el gasto' });
            return;
        }
        /* if (result.affectedRows === 0) {
            res.status(404).send('No se encontró el gasto');
            return; */
        //}
        res.status(200).json({ message: 'Gasto eliminado exitosamente' });
    });
});
//ruta para actualizar un gasto
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario } = req.body;
    const query = `UPDATE RegistroGastos SET Descripcion = ?, monto = ?, fecha = ?, metodo = ?, Id_Tipo = ?, Id_Presupuesto = ?, Id_Usuario = ?
    WHERE Id_Gasto = ?`;
    database1_1.default.query(query, [Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el gasto:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Gasto actualizado correctamente' });
    });
});
// Exporta el router para usarlo en el servidor 
exports.default = router;
