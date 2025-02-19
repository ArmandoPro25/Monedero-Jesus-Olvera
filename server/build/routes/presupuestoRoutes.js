"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database1_1 = __importDefault(require("../database1"));
const router = (0, express_1.Router)();
// Obtener todos los presupuestos
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM presupuesto';
    database1_1.default.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});
// Obtener un presupuesto por su ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM presupuesto WHERE Id_Presupuesto = ?';
    database1_1.default.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // results es un array de resultados
        const presupuestos = results; // Asegúrate de que es un array
        if (presupuestos.length === 0) {
            return res.status(404).json({ error: 'Presupuesto no encontrado' });
        }
        res.status(200).json(presupuestos[0]); // Devuelve el primer presupuesto encontrado
    });
});
// Agregar un nuevo presupuesto
router.post('/add', (req, res) => {
    const { cantidad, fecha_Ini, fecha_Fin } = req.body;
    const query = 'INSERT INTO presupuesto (cantidad, fecha_Ini, fecha_Fin) VALUES (?, ?, ?)';
    database1_1.default.query(query, [cantidad, fecha_Ini, fecha_Fin], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Presupuesto agregado exitosamente' });
    });
});
// Actualizar un presupuesto
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { cantidad, fecha_Ini, fecha_Fin } = req.body;
    const query = 'UPDATE presupuesto SET cantidad = ?, fecha_Ini = ?, fecha_Fin = ? WHERE Id_Presupuesto = ?';
    database1_1.default.query(query, [cantidad, fecha_Ini, fecha_Fin, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Presupuesto actualizado correctamente' });
    });
});
// Eliminar un presupuesto
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM presupuesto WHERE Id_Presupuesto = ?';
    database1_1.default.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Presupuesto eliminado exitosamente' });
    });
});
exports.default = router;
