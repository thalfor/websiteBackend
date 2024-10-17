//
import { Router } from "express";
//
const usersRoutes = Router();
//
usersRoutes.post("/", () => {
  const { email, password } = request.body;
  response.JSON({ email, password });
})
//
module.exports = usersRoutes;
//