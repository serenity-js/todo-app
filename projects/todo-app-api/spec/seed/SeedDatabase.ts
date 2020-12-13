import { Task } from '@serenity-js/core';
import { Ensure, equals } from '@serenity-js/assertions';
import { LastResponse, PostRequest, Send } from '@serenity-js/rest';
import { TodoDbSchema } from '../../src/db';

export class SeedDatabase {
  static with = (data: TodoDbSchema) =>
    Task.where(`#actor seeds the database`,
      Send.a(PostRequest.to('/seed').with(data)),
      Ensure.that(LastResponse.status(), equals(200)),
    )
}
