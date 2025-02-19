import { Router, Request, Response } from 'express';
import db from '../database1';

const router = Router();

// Obtener todos los presupuestos
router.get('/all', (req: Request, res: Response) => {
  const query = 'SELECT * FROM presupuesto';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Obtener un presupuesto por su ID
router.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const query = 'SELECT * FROM presupuesto WHERE Id_Presupuesto = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // results es un array de resultados
      const presupuestos = results as any[]; // Asegúrate de que es un array
      if (presupuestos.length === 0) {
        return res.status(404).json({ error: 'Presupuesto no encontrado' });
      }
      res.status(200).json(presupuestos[0]); // Devuelve el primer presupuesto encontrado
    });
  });
  

// Agregar un nuevo presupuesto
router.post('/add', (req: Request, res: Response) => {
  const { cantidad, fecha_Ini, fecha_Fin } = req.body;
  const query = 'INSERT INTO presupuesto (cantidad, fecha_Ini, fecha_Fin) VALUES (?, ?, ?)';
  db.query(query, [cantidad, fecha_Ini, fecha_Fin], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Presupuesto agregado exitosamente' });
  });
});

// Actualizar un presupuesto
router.put('/update/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { cantidad, fecha_Ini, fecha_Fin } = req.body;
  const query = 'UPDATE presupuesto SET cantidad = ?, fecha_Ini = ?, fecha_Fin = ? WHERE Id_Presupuesto = ?';
  db.query(query, [cantidad, fecha_Ini, fecha_Fin, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Presupuesto actualizado correctamente' });
  });
});

// Eliminar un presupuesto
router.delete('/delete/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'DELETE FROM presupuesto WHERE Id_Presupuesto = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Presupuesto eliminado exitosamente' });
  });
});

export default router;
