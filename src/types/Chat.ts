import { IUser, User } from './User';

export interface IMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
  sender?: IUser;
}

export interface IRoomParticipant {
  id: string;
  room_id: string;
  user_id: string;
  role: string;
  user: IUser;
}

export interface IRoom {
  id: string;
  name: string;
  type: string;
  lastMessage?: IMessage;
  participants: IRoomParticipant[];
}

export class Message implements IMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
  sender?: IUser;

  constructor(data: any) {
    this.id = data.id;
    this.roomId = data.roomId || data.room_id;
    this.senderId = data.senderId || data.sender_id;
    this.content = data.content;
    this.type = data.type;
    this.createdAt = data.createdAt || data.created_at;
    this.sender = data.sender ? new User(data.sender) : undefined;
  }
}

export class Room implements IRoom {
  id: string;
  name: string;
  type: string;
  lastMessage?: IMessage;
  participants: IRoomParticipant[];

  constructor({ id, name, type, lastMessage, participants }: any) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.lastMessage = lastMessage ? new Message(lastMessage) : undefined;
    this.participants = participants ? participants.map((p: any) => ({
      ...p,
      user: p.user ? new User(p.user) : undefined
    })) : [];
  }
}
