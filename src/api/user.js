import request from "@utils/request";

/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
  return request.post("/login", data, { login: false });
}

/**
 * code获取用户信息
 * @param data object code
 */
export function getUserInfo(code) {
  return request.get(`/api/wx/user/${code}`, null, { login: false });
}
