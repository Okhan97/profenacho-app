import { auth } from "../firebase";

export const getApiToken = async () => {
  try {
    console.log("auth", auth);
    const user = auth.currentUser;
    console.log("Current user:", user);
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
  } catch (error) {
    console.error("Failed to get API token:", error);
    return null;
  }
};
