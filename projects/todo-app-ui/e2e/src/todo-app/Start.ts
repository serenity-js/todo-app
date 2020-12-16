import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Navigate, Website } from '@serenity-js/protractor';
import { RecordItem } from './RecordItem';
import { ClearLocalStorage } from './ClearLocalStorage';

export class Start {
  static withAnEmptyList = () =>
    Task.where(`#actor starts with an empty list`,
      Navigate.to('/'),
      ClearLocalStorage(),
      Navigate.reloadPage(),
      Ensure.that(Website.title(), equals('Serenity/JS TodoApp')),
    )

  static withAListContaining = (...items: string[]) =>
    Task.where(`#actor starts with a list containing ${ items.length } items`,
      Start.withAnEmptyList(),
      ...items.map(RecordItem.called),
    )
}
