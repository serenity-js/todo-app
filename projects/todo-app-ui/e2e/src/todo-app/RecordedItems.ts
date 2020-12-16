import { Text } from '@serenity-js/protractor';
import { TodoList } from './ui';

export class RecordedItems {
  static names = () =>
    Text.ofAll(TodoList.items()).describedAs('names of recorded items')
}

