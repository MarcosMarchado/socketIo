import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { secret } from './config'


export function generateToken(data: object) {
  return jwt.sign(data, secret, { expiresIn: '1d' }) //gerar Token
}

export function decodeToken(token: string) {
  const data = jwt.verify(token, secret, (err, decoded) => {
    if (err) return 'Authentication error';
    return decoded
  })
  return data;
}

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send("Acesso negado.")
  } else {
    jwt.verify(token, secret, function (error: any, decoded: any) {
      if (error) {
        res.status(401).json("Credenciais inválidas.");
      } else {
        next();
      }
    });
  }
}

