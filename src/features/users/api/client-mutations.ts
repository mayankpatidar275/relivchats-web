import { clientApi } from "@/src/lib/api/client-api";
import { User, UserDeleteResponse, UserOut } from "../types";

export const userMutations = {
  storeUser: async (data: User): Promise<UserOut> => {
    return clientApi.post<UserOut>("users/store", data);
  },
  deleteUser: async (): Promise<UserDeleteResponse> => {
    return clientApi.delete<UserDeleteResponse>("users/delete-account");
  },
};
