import { Application } from 'express';
import bodyParser = require('json-server/lib/server/body-parser');
import { LowdbSync } from 'lowdb';
import { TodoDbSchema } from '../db';

export function seed(api: Application, db: LowdbSync<TodoDbSchema>): Application {

  return api.use(bodyParser)
    .post('/seed', (req, res) => {

      const state = req.body || {};

      db.setState(state);
      db.write();

      return res.sendStatus(200);
    });
}
