import { Application } from 'express';
import { LowdbSync } from 'lowdb';
import { TodoDbSchema } from '../db';

export function health(api: Application, db: LowdbSync<TodoDbSchema>): Application {

  return api.get('/health', (req, res) => {
      res.status(200).send({
          uptime: Math.floor(process.uptime()),
      });
  });
}
