//
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
//
class UsersController {
  async create(request, response) {
    const { email, password } = request.body;

    const database = await sqliteConnection();
    
    const checkUserExists = await database.get("select * from users where email = (?)", [email]);
    if(checkUserExists){
      throw new AppError("this email already exists");
    }

    await database.run("insert into users (email, password) values (?, ?)", [email, password]);
    
    response.status(201).json({ email, password });
  }
}
//
module.exports = UsersController;
//