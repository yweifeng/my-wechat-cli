import request from "@utils/request";

/**
 * 首页
 * @returns {*}
 */
export function getHomeData() {
  return request.get("index", {}, { login: false });
}
