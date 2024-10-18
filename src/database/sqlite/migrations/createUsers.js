//
const createUsers = `
create table if not exists users (
	id integer primary key autoincrement, 
  email varchar, 
  password varchar, 
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp
);
`;
//
module.exports = createUsers;
//