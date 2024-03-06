import bcryptjs from "bcryptjs";

const users = [
    {
      username: "Admin",
      email: "admin@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: true,
    },
    {
      username: "User1",
      email: "user1@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    },
    {
      username: "User2",
      email: "user2@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    },
    {
      username: "User3",
      email: "user3@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    }
  ];

  export default users;