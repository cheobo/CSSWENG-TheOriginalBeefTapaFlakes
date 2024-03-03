import bcryptjs from "bcryptjs";

const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: true,
    },
    {
      name: "User1",
      email: "user1@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    },
    {
      name: "User2",
      email: "user2@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    },
    {
      name: "User3",
      email: "user3@gmail.com",
      password: bcryptjs.hashSync("123", 10),
      isAdmin: false,
    }
  ];

  export default users;