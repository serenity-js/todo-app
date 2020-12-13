import * as http from 'http';
import * as jsonServer from 'json-server';
import { TodoDbSchema } from '../db';
import { health } from './health';
import { seed } from './seed';

export function api(options: jsonServer.MiddlewaresOptions, initialState: TodoDbSchema = { todos: [] }): http.RequestListener {

  const router = jsonServer.router<TodoDbSchema>(initialState);

  return [health, seed]
    .reduce(
      (currentApi, route) => route(currentApi, router.db),
      jsonServer.create(),
    )
    .use(jsonServer.defaults(options))
    .use(router);
}


