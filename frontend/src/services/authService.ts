import axiosInstance from "./axiosConfig"; 

// Register User
export const registerUser = async (email: string, password: string, password_confirmation?: string) => {
  const response = await axiosInstance.post(`/auth/register`, { email, password, password_confirmation });
  return response.data;
};

// Logout User
export const logout = async () => {
  await axiosInstance.post(`/auth/logout`);
  localStorage.removeItem("token");
};

// Login User
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login`, { email, password });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return response.data;
};

// Check if user is logged in
export const getUser = async () => {
  try {
    const response = await axiosInstance.get(`/user`)
    return response.data;
  } catch {
    return null;
  }
};