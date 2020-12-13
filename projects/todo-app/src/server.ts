import { api, TodoDbSchema } from '@serenity-dojo/todo-app-api';
import * as express from 'express';
import * as jsonServer from 'json-server';

export function server(initialState: TodoDbSchema = { todos: [] }, options: jsonServer.MiddlewaresOptions = {}): express.Application  {

  return api(
    '/api',
    initialState,
    { ...options, static: require('@serenity-dojo/todo-app-ui').path },
    router => router.get('/config.json', (req, res) => {
      res.send({
        storage: 'TodoRestStorageService',
      });
    })
  );
}
