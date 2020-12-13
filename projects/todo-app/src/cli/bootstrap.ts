const yargs = require('yargs');             // tslint:disable-line:no-var-requires
const pkg = require('../../package.json');  // tslint:disable-line:no-var-requires

import { start } from './start';

export type Interceptor = (error: Error, parsed: { [key: string]: string | number }, output: string) => void;

export function bootstrap(argv: string[], interceptor?: Interceptor): Promise<void> {
  const args = yargs()
    .version(require('../../package.json').version)
    .usage('$0 [options]')
    .options({
      port: {
        alias: 'p',
        description: 'The port to start the web server on',
        default: 3000,
      },
    })
    .epilog(`copyright (C) 2016-${ new Date().getFullYear() } ${ pkg.author.name } <${ pkg.author.email }>`)
    .alias('h', 'help').help()
    .parse(argv, { }, interceptor);

  return start(args);
}
