import { AuthRequest } from '../../utils/bookInterface';

export const validAuth: AuthRequest = {
  username: 'admin',
  password: 'password123'
};

export const invalidAuth: AuthRequest = {
  username: 'admin',
  password: 'wrongPassword'
};
