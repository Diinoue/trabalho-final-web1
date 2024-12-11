const mysql = require('mysql2/promise');

const dbSession = mysql.createPool ({
    host:"localhost",
    port:3306,
    user:"root",
    password:"admin",
    database:"listaCadastros"
});

const testConnection = async () => {
    try{
        const connection = await dbSession.getConnection();
        console.log("Conectado");
        connection.release();
    } catch (error) {
        console.error("Deu ruim: ", error);
    throw error;
}
};

const query = async (_query, values) => {
    try {
        const [rows, fields]  = await dbSession.execute (_query, values)
        return rows;
    } catch (error) {
        console.error ("Deu ruim: ", error);
        throw error;
    }
    };

module.exports = {
    testConnection,
    query,
    session: dbSession
};
