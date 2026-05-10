export interface IUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  status: string;
}

export class User implements IUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  status: string;

  constructor({ id, username, email, avatar_url, bio, status }: any) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatar_url;
    this.bio = bio;
    this.status = status;
  }
}
