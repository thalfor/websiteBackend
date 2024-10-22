//
const { hash, compare } = require('bcryptjs');
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

    const hashedPassword = await hash(password, 8)

    await database.run("insert into users (email, password) values (?, ?)", [email, hashedPassword]);
    
    response.status(201).json({ email, password });
  }
//
//
  async update(request, response) {
    const { email, oldPassword, newPassword } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("select * from users where id = (?)", [user_id]);

    if(!user) {
      throw new AppError("Usuário não encontrado")
     }

    const checkUserExists = await database.get("select * from users where email = (?)", [email]);
    if(!checkUserExists){
      throw new AppError("this email does not exists");
    }

    if(oldPassword && !newPassword) {
      throw new AppError("you need to inform both passwords");
    }

    if(oldPassword && newPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if(!checkOldPassword) {
        throw new AppError("old password does not match");
      }

      user.password = await hash(newPassword, 8);

      await database.run("update users set password = ?, updatedAt = ? where id = ?", [user.password, new Date(), id]);
    }

    return response.json()
  }
}
//
module.exports = UsersController;
//