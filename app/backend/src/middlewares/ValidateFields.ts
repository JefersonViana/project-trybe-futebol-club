import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class ValidateLogin {
  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const requiredKeys = ['email', 'password'];
    for (let index = 0; index < requiredKeys.length; index += 1) {
      const notFoundKey = requiredKeys[index];
      if (!(notFoundKey in login)) {
        return res.status(mapStatusHTTP('INVALID_DATA'))
          .json({ message: 'All fields must be filled' });
      }
    }
    if (!login.password || !login.email) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'All fields must be filled' });
    }
    const regex = /\S+@\S+\.\S+/;
    if (login.password.length <= 6 || !regex.test(login.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }
}

export default ValidateLogin;
