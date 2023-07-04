export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  media: IMedia[];
  token: string;
}
export interface IMedia {
  id: string;
  title: string;
  description?: string;
  type: Medium;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  notes: INote[];
  user: IUser;
  userId: string;
}

export interface INote {
  id: string;
  title: string;
  body?: string;
  season?: number;
  episode?: number;
  timestamp?: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
  mediaId: string;
  media: IMedia;
}

export enum Medium {
  Movie = "movie",
  Show = "show",
  Anime = "anime",
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
