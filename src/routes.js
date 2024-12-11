const { Router } = require("express");
const usersController = require ("../controllers/usersControllers");

const routes = Router();

routes.get("/users", usersController.show);
routes.post("/users", usersController.store);
routes.put("/users", usersController.update);
routes.delete("/users/:id", usersController.delete);

module.exports = routes;