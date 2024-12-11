const repository = require("../repositories/users.js");

class usersController{

  async jaExiste(request, response){
    const email = request.body;
    console.log("chegou no controller", email);
    let valido = false
    const teste = await repository.findByEmail(email);
    console.log("aaa",teste);
    if(Array.isArray(teste) && teste.length === 0){
        valido = true;
    } else {
      valido = false;
    }
    console.log("valido = ", valido);
    response.status(201).json(valido);
  }


//READ
async show(request,response){
  const users = await repository.findAll();
  response.status(201).json(users);
}

//CREATE
async store (request, response) {
  
    const {nome, sobrenome, email, senha} = request.body;
    
    await repository.createUser({
        nome,
        sobrenome,
        email,
        senha,
    });
    response.status(201).json("deu bao");
    }

//UPDATE
    async update(request, response) {
      const {id, nome, sobrenome, email, senha} = request.body;
      await repository.updateUser({
        id,
        nome,
        sobrenome,
        email,
        senha,
    });
    response.status(201).json("deu bao");
    }
    

//DELETE
async delete(request, response) {
      console.log("o ID eh: ",request.params.id);
      const deleteId = request.params.id;
      console.log("isso aq ta no delete: ", deleteId);
    await repository.delete(deleteId);
    response.status(201).json("deu bao");
  }
}


module.exports = new usersController();