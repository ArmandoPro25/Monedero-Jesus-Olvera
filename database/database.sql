CREATE DATABASE monedero;
USE monedero;

CREATE TABLE TipoGasto(
    Id_Tipo INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(180) NOT NULL
);
CREATE TABLE Presupuesto(
    Id_Presupuesto INT AUTO_INCREMENT PRIMARY KEY,
    cantidad DECIMAL(10,2) NOT NULL,
    fecha_Ini DATE NOT NULL,
    fecha_Fin DATE NOT NULL
);
CREATE TABLE Usuario(
    Id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)NOT NULL,
    apellido VARCHAR(100)NOT NULL,
    email VARCHAR(100)NOT NULL,
    Ocupacion VARCHAR(50)NOT NULL,
    password VARCHAR(100) NOT NULL,
    confirmar_password VARCHAR(100) NOT NULL,
    Id_TipoUser INT NOT NULL
);
CREATE TABLE TipoUser(
    Id_TipoUser INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR (50) NOT NULL
);
CREATE TABLE RegistroGastos (
    Id_Gasto INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR (180) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    metodo VARCHAR(50)NOT NULL,
    Id_Tipo INT NOT NULL,
    Id_Presupuesto INT NOT NULL,
    Id_Usuario INT NOT NULL

);
ALTER TABLE RegistroGastos add constraint FK_Id_Tipo FOREIGN KEY (Id_Tipo)
references TipoGasto (Id_Tipo);

ALTER TABLE RegistroGastos add constraint FK_Presupuesto FOREIGN KEY (Id_Presupuesto)
references Presupuesto (Id_Presupuesto);

ALTER TABLE RegistroGastos add constraint FK_Id_Usuario FOREIGN KEY (Id_Usuario)
    references Usuario (Id_Usuario);

ALTER TABLE Usuario add constraint FK_Id_TipoUser FOREIGN KEY (Id_TipoUser)
    references TipoUser (Id_TipoUser);

INSERT INTO TipoUser VALUES (100,'Usuario');
INSERT INTO TipoUser VALUES (200,'Colaborador');

INSERT INTO TipoGasto VALUES (1,'Comida');
INSERT INTO TipoGasto VALUES (2,'Transporte');
INSERT INTO TipoGasto VALUES (3,'Viaticos');
INSERT INTO TipoGasto VALUES (4,'Servicio(agua,luz,gas)');
INSERT INTO TipoGasto VALUES (5,'Otro');