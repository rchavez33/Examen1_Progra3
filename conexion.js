const express = require('express');
const bodyParser = require('body-parser');
const { Connection, Request, TYPES } = require('tedious');

const app = express();
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const config = {
    server: 'DESKTOP-942ENF9\\SQLEXPRESS',
    authentication: {
        type: 'default',
        options: {
            userName: 'RobertoCH',
            password: 'Roberto3344*',
        }
    },
    options: {
        database: 'FORMULARIO',
        encrypt: false,
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error("Error al conectarse a la base de datos:", err);
    } else {
        console.log("Conectado a la base de datos");
    }
});

app.post('/api/guardarFormulario', async (req, res) => {
    const data = req.body;

    try {
        const request = new Request(
            `INSERT INTO CUESTIONARIO (formNumber, cantidadInvestigadores, correo, fechaInicio, fechaFin, organizacion, especie, zona, estacion, especimenes, adultos, crias, horaCaza, horaDormir, horaMigracion, guardabosques, cazadores) 
            VALUES (@formNumber, @cantidadInvestigadores, @correo, @fechaInicio, @fechaFin, @organizacion, @especie, @zona, @estacion, @especimenes, @adultos, @crias, @horaCaza, @horaDormir, @horaMigracion, @guardabosques, @cazadores)`,
            (err) => {
                if (err) {
                    console.error('Error al ejecutar la consulta:', err);
                    res.status(500).send('Error al guardar los datos: ' + err.message);
                } else {
                    res.status(200).send('Datos guardados exitosamente');
                }
            }
        );

        // Agregar parámetros
        request.addParameter('formNumber', TYPES.Int, data.formNumber);
        request.addParameter('cantidadInvestigadores', TYPES.Int, data.cantidadInvestigadores);
        request.addParameter('correo', TYPES.VarChar, data.correo);
        request.addParameter('fechaInicio', TYPES.Date, data.fechaInicio);
        request.addParameter('fechaFin', TYPES.Date, data.fechaFin);
        request.addParameter('organizacion', TYPES.VarChar, data.organizacion);
        request.addParameter('especie', TYPES.VarChar, data.especie);
        request.addParameter('zona', TYPES.VarChar, data.zona);
        request.addParameter('estacion', TYPES.VarChar, data.estacion);
        request.addParameter('especimenes', TYPES.Int, data.especimenes);
        request.addParameter('adultos', TYPES.Int, data.adultos);
        request.addParameter('crias', TYPES.Int, data.crias);
        request.addParameter('horaCaza', TYPES.Time, data.horaCaza);
        request.addParameter('horaDormir', TYPES.Time, data.horaDormir);
        request.addParameter('horaMigracion', TYPES.Time, data.horaMigracion);
        request.addParameter('guardabosques', TYPES.VarChar, data.guardabosques);
        request.addParameter('cazadores', TYPES.VarChar, data.cazadores);

        // Ejecutar la consulta
        await new Promise((resolve, reject) => {
            connection.execSql(request);
            request.on('doneInProc', resolve);
            request.on('error', reject);
        });

        res.status(200).send('Datos guardados exitosamente');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).send('Error al guardar los datos: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
