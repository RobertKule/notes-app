import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

const authService = {
  // Register a new user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return { error: error.message || "Registration failed. Please try again." };
    }
  },

  // Login an existing user
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(email, password); // ✅ fix camelCase
      return response;
    } catch (error) {
      return { error: error.message || "Login failed. Please try again." };
    }
  },

  // Logout the current user
  async logout() {
    try {
      await account.deleteSession("current");
      return { success: true };
    } catch (error) {
      return { error: error.message || "Logout failed. Please try again." };
    }
  },

  // Get the currently logged-in user
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return { error: error.message || "Failed to fetch user. Please try again." };
    }
  },
};

export default authService;
