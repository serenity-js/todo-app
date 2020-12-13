import * as jsonServer from 'json-server';
import { TodoDbSchema } from '../db';
import { health } from './health';
import { seed } from './seed';
import { Application } from 'express';
import { LowdbSync } from 'lowdb';

export function api(
  path: string = '/api',
  initialState: TodoDbSchema = { todos: [] },
  options: jsonServer.MiddlewaresOptions = {},
  ...customRoutes: Array<(api: Application, db?: LowdbSync<TodoDbSchema>) => Application>
): Application {

  const prefix = `/${path}`.replace(/\/+/, '/');
  const rewriter = jsonServer.rewriter({
    [`${prefix}/*`]: '/$1',
  });

  const router = jsonServer.router<TodoDbSchema>(initialState);

  return [health, seed, ...customRoutes]
    .reduce(
      (currentApi, route) => route(currentApi, router.db),
      jsonServer.create().use(rewriter),
    )
    .use(jsonServer.defaults(options))
    .use(router);
}


