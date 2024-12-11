const db = require("../models/dbConnect");

class userRepository {

    async findAll() {
        const rows = await db.query (
            `
            SELECT * FROM users;
            `
        );
        return rows;
    }


    async createUser({nome, sobrenome, email, senha}){
      console.log("TA NO REPOSITORY: ", nome, sobrenome, email, senha);
        await db.query(
            `
            INSERT INTO users(
            nome,
            sobrenome,
            email,
            senha
            )
            VALUES (
            ?, ?, ?, ?)`,
            [nome, sobrenome, email, senha]
        )
      //  const idResult = result.insertId;
       // return idResult;
    };

    async updateUser({id,nome, sobrenome, email, senha,}) {
        
        await db.query(
            `
            UPDATE users
            SET nome = ?, sobrenome = ?, email = ?, senha = ?
            WHERE id = ?
            ;
          `,
            [nome, sobrenome, email, senha, id]
          );
    }

    async delete(id) {
        const result = await db.query(
          `
          DELETE FROM users
          WHERE id = ?
        `,
          [id]
        );
      }
}
module.exports = new userRepository();