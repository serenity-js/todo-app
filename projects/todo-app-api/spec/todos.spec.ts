import 'mocha';
import { actorCalled, Note, q } from '@serenity-js/core';
import { ChangeApiConfig, DeleteRequest, GetRequest, LastResponse, PostRequest, PutRequest, Send } from '@serenity-js/rest';
import { Ensure, equals, isFalse, isGreaterThan, property } from '@serenity-js/assertions';
import { SerialisedTodoItem, TodoItem } from '@serenity-dojo/todo-app-domain';
import { SeedDatabase } from './seed';
import { RecordViaApi } from './todos';
import { LocalServer, StartLocalServer, StopLocalServer } from '@serenity-js/local-server';

describe('TodoApp API', () => {

  before(() =>
    actorCalled('Apisitt').attemptsTo(
      StartLocalServer.onRandomPort(),
      ChangeApiConfig.setUrlTo(LocalServer.url()),
    ));

  after(() =>
    actorCalled('Apisitt').attemptsTo(
      StopLocalServer.ifRunning(),
    ));

  describe('GET /todos', () => {

    it('returns an empty list if no items have been recorded', () =>
      actorCalled('Apisitt').attemptsTo(
        Send.a(GetRequest.to('/todos')),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body<SerialisedTodoItem[]>(), equals([])),
      ));

    it('returns the recorded items', () =>
      actorCalled('Apisitt').attemptsTo(
        SeedDatabase.with({ todos: [ new TodoItem(1, 'Learn Serenity/JS', true).toJSON() ] }),

        Send.a(GetRequest.to('/todos')),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body<SerialisedTodoItem[]>(), equals([{
          id: 1,
          name: 'Learn Serenity/JS',
          completed: true,
        }])),
      ));
  });

  describe('POST /todos', () => {

    it(`assigns an id to an item when the item is recorded`, () =>
      actorCalled('Apisitt').attemptsTo(

        Send.a(PostRequest.to('/todos').with({ name: 'Write some code', completed: false })),

        Ensure.that(LastResponse.status(), equals(201)),
        Ensure.that(LastResponse.body<SerialisedTodoItem>(), property('id', isGreaterThan(0))),
        Ensure.that(LastResponse.body<SerialisedTodoItem>(), property('name', equals('Write some code'))),
        Ensure.that(LastResponse.body<SerialisedTodoItem>(), property('completed', isFalse())),
      ));
  });

  describe('GET /todos/:id', () => {

    it('returns a todo item by id', () =>
      actorCalled('Apisitt').attemptsTo(

        RecordViaApi.item(new TodoItem(undefined, 'Write some code', false))
          .andNoteItsIdAs('todo id'),

        Send.a(GetRequest.to(q`/todos/${ Note.of('todo id') }`.describedAs('/todos/:id'))),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body<SerialisedTodoItem>(), property('name', equals('Write some code'))),
      ));
  });

  describe('DELETE /todos/:id', () => {

    it('deletes a todo item by id', () =>
      actorCalled('Apisitt').attemptsTo(

        RecordViaApi.item(new TodoItem(undefined, 'Write some code', false))
          .andNoteItsIdAs('todo id'),

        Send.a(DeleteRequest.to(q`/todos/${ Note.of('todo id') }`.describedAs('/todos/:id'))),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body(), equals({})),
      ));
  });

  describe('PUT /todos/:id', () => {

    it('updates a todo item by id', () =>
      actorCalled('Apisitt').attemptsTo(

        RecordViaApi.item(new TodoItem(undefined, 'Write some code', false)).andNoteItsIdAs('todo id'),

        Send.a(PutRequest.to(q`/todos/${ Note.of('todo id') }`.describedAs('/todos/:id')).with({ name: 'Write a book' })),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body<SerialisedTodoItem>(), property('name', equals('Write a book'))),
      ));
  });

});
