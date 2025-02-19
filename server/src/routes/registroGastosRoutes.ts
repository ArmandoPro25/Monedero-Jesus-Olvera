// src/routes/registroGastosRoutes.ts
import { Router, Request, Response } from 'express';
import db from '../database1';

const router = Router();

// Ruta para agregar un nuevo gasto
router.post('/add', (req: Request, res: Response) => {
    const { Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario } = req.body;

    const query = 'INSERT INTO RegistroGastos (Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario], (err, result) => {
        if (err) {
            console.error('Error al insertar gasto:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Gasto agregado correctamente' });
    });
});

// Ruta para obtener todos los gastos
router.get('/all', (req: Request, res: Response) => {
    const query = 'SELECT * FROM RegistroGastos';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los gastos:', err);
            res.status(500).send('Error al obtener los gastos');
            return;
        }
        res.status(200).json(results);
    });
});

//Ruta para obtener un gasto por su ID
router.get('/:id', (req: Request, res: Response) =>{
    const id = req.params.id;

    const query = 'SELECT * FROM RegistroGastos WHERE Id_Gasto = ?';

    db.query(query, [id], (err, results: any[]) =>{
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
router.delete('/delete/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const query = 'DELETE FROM RegistroGastos WHERE Id_Gasto = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el gasto:', err);
            res.status(500).json({ error: 'Error al eliminar el gasto'});
            return;
        }
        /* if (result.affectedRows === 0) {
            res.status(404).send('No se encontró el gasto');
            return; */
        //}
        res.status(200).json({ message: 'Gasto eliminado exitosamente'});
    });
});

//ruta para actualizar un gasto
router.put('/update/:id', (req: Request, res: Response) =>{
    const {id} = req.params;
    const {Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario } = req.body;

    const query = `UPDATE RegistroGastos SET Descripcion = ?, monto = ?, fecha = ?, metodo = ?, Id_Tipo = ?, Id_Presupuesto = ?, Id_Usuario = ?
    WHERE Id_Gasto = ?`;

    db.query(query, [Descripcion, monto, fecha, metodo, Id_Tipo, Id_Presupuesto, Id_Usuario, id], (err, result) => {
      if (err){
        console.error('Error al actualizar el gasto:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }  
      res.status(200).json({ message: 'Gasto actualizado correctamente' });
    });
});

// Exporta el router para usarlo en el servidor 
export default router;
