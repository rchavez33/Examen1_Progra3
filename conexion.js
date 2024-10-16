const Connection = require('tedious').Connection;

const config = {
    server: 'DESKTOP-942ENF9\SQLEXPRESS', // Aquí el nombre de tu instancia SQL Server
    autentication: {
        type: 'default',
        options: {
            userName: 'Roberto',            // Cambia esto a tu usuario SQL Server 
            password: 'Roberto3344*',      // Cambia esto a tu contraseña SQL Server 
        }
    },
    options: {
        port: 1433,
        database: 'RobertoChaves',
        encrypt: false,
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err)=>{
    if(err){
        console.log("Error al conectarse a la base de datos");
    }
    executeStatement();
});

function executeStatement(){
    console.log("Conectado a la base de datos");
}

