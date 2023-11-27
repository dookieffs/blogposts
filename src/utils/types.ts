export type Nullable<T> = T | null;

export type LoginPayload = {
  username: string;
  password: string;
};

export type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type UserLoginData = {
  uuid: string;
  username: string;
  password: string;
  md5: string;
  sha1: string;
  registered: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  login: UserLoginData;
  address: Address;
  phone: string;
  website: string;
  company: UserCompany;
};

export type PostComment = {
  id: number;
  postId: number;
  userId: number;
  comment: string;
};

export type Post = {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
};
