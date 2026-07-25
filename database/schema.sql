-- Proyecto: OTT MVP
-- Base de datos: ott_mvp
-- Autor: Equipo
-- Descripción:
-- Script para crear toda la base de datos.

USE ott_mvp;

CREATE TABLE region (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) NOT NULL UNIQUE

);

