import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { userMutations } from "./client-mutations";

export function useStoreUserMutation() {
  return useMutation({
    mutationFn: (userData: User) => {
      return userMutations.storeUser(userData);
    },
    onSuccess: (data) => {
      console.log("User stored successfully:", data);
    },
    onError: (error) => {
      console.error("Error storing user:", error);
    },
  });
}
export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: () => {
      return userMutations.deleteUser();
    },
    onSuccess: (data) => {
      console.log("User deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
}
