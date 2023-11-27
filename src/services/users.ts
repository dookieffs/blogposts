import type { User } from "@utils/types";
import { client } from "@services/client";

export async function getUsers() {
  const { data } = await client.get<User[]>("/users");

  return data;
}

export async function getUserById(userId: number) {
  const { data } = await client.get<User>(`/users/${userId}`);

  return data;
}
