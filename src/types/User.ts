export interface IUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  status: string;
}

export class User implements IUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  status: string;

  constructor({ id, username, email, avatar_url, status }: any) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatar_url;
    this.status = status;
  }
}
