import httpService from "./http";
import config from "./../config.json";

const { apiURL } = config;

export async function login(user_info) {
  const url = `${apiURL}/login-user`;
  const { data } = await httpService.post(url, user_info);
  // console.log(user.success);

  if (!data.error) {
    login_user_locally(data);
    return;
  }

  throw new Error(data.error);
}

export function login_user_locally(user_data) {
  localStorage.setItem("tf_user", JSON.stringify(user_data.user));
}

export function logout() {
  localStorage.removeItem("tf_user");
}

export function getUserID() {
  try {
    let user = localStorage.getItem("tf_user");
    user = JSON.parse(user);
    return user.ID;
  } catch (ex) {
    return null;
  }
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem("tf_user");
    return JSON.parse(user);
  } catch (ex) {
    return null;
  }
}

export function getUserRole() {
  try {
    let roles = localStorage.getItem("user_roles");
    roles = JSON.parse(roles);

    if (roles.includes("administrator")) return "admin";
    if (roles.includes("designer")) return "designer";
    if (roles.includes("customer")) return "customer";
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
