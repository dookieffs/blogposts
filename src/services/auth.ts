import type { LoginPayload } from "@utils/types";
import { getUsers } from "@services/users";

export async function login(payload: LoginPayload) {
  const users = await getUsers();
  const user = users.find(
    ({ login }) =>
      login.username === payload.username && login.password === login.password
  );

  if (!user) {
    return Promise.reject("Failed to authenticate user.");
  }

  return Promise.resolve(user);
}
