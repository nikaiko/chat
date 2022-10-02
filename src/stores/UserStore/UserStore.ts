import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import socket from "../../configs/socket";
import MessageModel from "../../models/MessageModel";
import UserModel from "../../models/UserModel";
import ChatService from "../../services/ChatService";

type PrivateFields = "_user" | "_isAuth" | "_users" | "_messages";

class UserStore {
  private _user: UserModel | null = null;
  private _isAuth: boolean = false;
  private _users: UserModel[] = [];
  private _messages: MessageModel[] = [];

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable.ref,
      _isAuth: observable,
      _users: observable.ref,
      _messages: observable.ref,
      user: computed,
      isAuth: computed,
      users: computed,
      messages: computed,
      login: action,
      setUsers: action,
      setMessages: action,
    });
  }

  login = async (username: string) => {
    this._user = null;
    this._isAuth = false;

    let user = (await ChatService.login(username)).data[0];

    if (!user) {
      user = (await ChatService.registration(username)).data;
    }
    socket.emit("message");

    runInAction(() => {
      this._user = user;
      this._isAuth = true;
    });
  };

  setUsers(users: UserModel[]) {
    this._users = users;
  }

  setMessages(messages: MessageModel[]) {
    this._messages = messages;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get users() {
    return this._users;
  }

  get messages() {
    return this._messages;
  }
}

export default UserStore;
