//
const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
//
class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if(!user) {
      throw new AppError("email or password incorrect.")
    }

    const comparePasswords = await compare(password, user.password);

    if(!comparePasswords) {
      throw new AppError("email or password incorrect.")
    }


/*
PUT HERE THE RESPONSE TO LOGIN
*/
    
    return response.json({ email, password });
  }
}
//
module.exports = SessionsController;
//