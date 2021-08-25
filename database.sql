CREATE DATABASE devis;

CREATE TABLE devis(
    year smallint NOT NULL PRIMARY KEY,
    number smallint NOT NULL PRIMARY KEY,
    created_at date NOT NULL
);
