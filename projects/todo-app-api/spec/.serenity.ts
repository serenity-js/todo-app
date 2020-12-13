import { Actor, Cast, configure, TakeNotes } from '@serenity-js/core';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ManageALocalServer } from '@serenity-js/local-server';
import { CallAnApi } from '@serenity-js/rest';
import axios from 'axios';
import { api } from '../src';

class Actors implements Cast {
  prepare(actor: Actor): Actor {
    return actor.whoCan(
      ManageALocalServer.runningAHttpListener(api({ logger: false }, { todos: [] })),
      CallAnApi.using(axios.create()),
      TakeNotes.usingAnEmptyNotepad(),
    );
  }
}

configure({
  actors: new Actors(),
  crew: [
    ConsoleReporter.withDefaultColourSupport(),
  ]
});
