import User from "@views/user/Login";

export default [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true,
      auth: true
    },
    component: User
  }
];
