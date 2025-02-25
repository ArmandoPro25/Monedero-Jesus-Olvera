import { Router, Request, Response } from 'express';
import db from '../database1';//importa la conexion a la base de datos

const router = Router();

//obtener todos los tipos de gastos
router.get('/all', (req: Request, res: Response)=>{
    const query = 'SELECT * FROM TipoGasto';
    db.query(query, (err, results)=>{
        if (err){
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//agregar un nuevo tipo de gasto
router.post('/add', (req: Request, res: Response)=>{
    const { Descripcion } = req.body;
    const query = 'INSERT INTO TipoGasto (Descripcion) VALUES (?)';
    db.query(query, [Descripcion], (err, results)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tipo de gasto agregado exitosamente' });
    });
});

//Actualizar un tipo de gasto
router.put('/update/:id', (req: Request, res: Response) =>{
    const { id } = req.params;
    const { Descripcion } = req.body;

    const query = 'UPDATE TipoGasto SET Descripcion = ? WHERE Id_Tipo = ?';

    db.query(query, [Descripcion, id], (err, result) =>{
        if(err){
            console.error('Error al actualizar tipo de gasto:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Tipo de gasto actualizado correctamente' });
    });
});

//ruta para obtener un tipo de gasto por su ID
router.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    
    const query = 'SELECT * FROM TipoGasto WHERE Id_Tipo = ?';

    db.query(query, [id], (err, results: any[]) => {
        if (err) {
            console.error('Error al obtener el tipo de gasto:', err.message);
            return res.status(500).json({ error: 'Error al obtener el tipo de gasto' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Tipo de gasto no encontrado' });
        }

        res.status(200).json(results[0]);
    });
});

//Eliminar un tipo de gasto
router.delete('/delete/:id', (req: Request, res: Response)=>{
    const { id } = req.params;
    const query = 'DELETE FROM TipoGasto WHERE Id_Tipo = ?';
    db.query(query, [id], (err, results)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tipo de gasto eliminado exitosamente '});
    });
});

export default router;