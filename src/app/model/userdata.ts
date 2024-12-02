export interface IUserData {
  email: string;
  password: string;
}

export class UserData implements IUserData {
  email: string = '';
  password: string = '';
}

//faccio un interface perchè mi è comodo tipizzare il login
