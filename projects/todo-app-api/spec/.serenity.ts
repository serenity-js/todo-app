import { Actor, Cast, configure, TakeNotes, ArtifactArchiver } from '@serenity-js/core';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ManageALocalServer } from '@serenity-js/local-server';
import { CallAnApi } from '@serenity-js/rest';
import axios from 'axios';
import { api } from '../src';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';

class Actors implements Cast {
  prepare(actor: Actor): Actor {
    return actor.whoCan(
      ManageALocalServer.runningAHttpListener(api('/', { todos: [] }, { logger: false })),
      CallAnApi.using(axios.create()),
      TakeNotes.usingAnEmptyNotepad(),
    );
  }
}

configure({
  actors: new Actors(),
  crew: [
    ConsoleReporter.withDefaultColourSupport(),
    ArtifactArchiver.storingArtifactsAt(__dirname, '../../../target/site/serenity'),
    new SerenityBDDReporter(),
  ]
});
