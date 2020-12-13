import { server } from '../server';

export interface Argv {
  _: Array<string | number>;
  $0: string;
  port: number;
}

export function start(argv: Argv): Promise<void> {
  return new Promise((resolve, reject) => {
    const instance = server(
      { todos: [] },
    );

    instance.on('error', reject);
    instance.listen(argv.port, '127.0.0.1', () => {
      // tslint:disable-next-line:no-console
      console.log(`
    Serenity/JS TodoApp started!
    - User Interface   -   Open http://localhost:${ argv.port }

    API:
    - Health check     -    GET http://localhost:${ argv.port }/api/health
    - Seed database    -   POST http://localhost:${ argv.port }/api/seed      { todos: [{ id: number, name: string, completed: boolean } ]}
    - List items       -    GET http://localhost:${ argv.port }/api/todos
    - Add an item      -   POST http://localhost:${ argv.port }/api/todos     { name: string, completed: boolean }
    - Update an item   -    PUT http://localhost:${ argv.port }/api/todos/:id { name: string, completed: boolean }
    - Remove an item   - DELETE http://localhost:${ argv.port }/api/todos/:id
            `);
    });
  });
}
