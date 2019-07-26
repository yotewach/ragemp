import { Player } from './player.interface';

export interface AuthenticationResult {
  authenticated: boolean;
  credentialsInvalid?: boolean;
}

export interface ResultRecord {
  registered: boolean;
  error?: boolean;
  message?: string;
  player?: Player;
}

export interface DataLogin {
  password: string;
}

export interface DataRegistration {
  email: string,
  phone: string,
  password: string,
  passwordConfirm: string,
}
