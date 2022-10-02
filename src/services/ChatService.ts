import { AxiosResponse } from "axios";
import api from "../configs/axios";
import MessageModel from "../models/MessageModel";
import UserModel from "../models/UserModel";

class ChatService {
  static login(username: string): Promise<AxiosResponse<UserModel[]>> {
    return api.get(`/users?username=${username}`);
  }

  static async registration(
    username: string
  ): Promise<AxiosResponse<UserModel>> {
    const response = await api.post("/users", {
      username,
      createdAt: Date.now(),
    });

    const msg: MessageModel = {
      username,
      text: `${username} вошёл в чат`,
      createdAt: Date.now(),
      notice: true,
    };

    api.post("/messages", msg);

    return response;
  }

  static sendMessage(
    text: string,
    username?: string
  ): Promise<AxiosResponse<MessageModel>> {
    return api.post("/messages", {
      username,
      text,
      createdAt: Date.now(),
      notice: false,
    });
  }

  static fetchUsers(): Promise<AxiosResponse<UserModel[]>> {
    return api.get("/users");
  }

  static fetchMessages(date?: number): Promise<AxiosResponse<MessageModel[]>> {
    return api.get(`/messages?createdAt_gte=${date}`);
  }
}

export default ChatService;
