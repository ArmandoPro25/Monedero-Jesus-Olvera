"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const db = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monedero',
});
/* db.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos:',err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
}); */
exports.default = db;
