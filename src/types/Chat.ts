import { IUser } from './User';

export interface IMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
  sender?: IUser;
}

export interface IRoom {
  id: string;
  name: string;
  type: string;
  lastMessage?: IMessage;
  participants: IUser[];
}

export class Message implements IMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
  sender?: IUser;

  constructor({ id, roomId, senderId, content, type, createdAt, sender }: any) {
    this.id = id;
    this.roomId = roomId;
    this.senderId = senderId;
    this.content = content;
    this.type = type;
    this.createdAt = createdAt;
    this.sender = sender;
  }
}

export class Room implements IRoom {
  id: string;
  name: string;
  type: string;
  lastMessage?: IMessage;
  participants: IUser[];

  constructor({ id, name, type, lastMessage, participants }: any) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.lastMessage = lastMessage;
    this.participants = participants;
  }
}
