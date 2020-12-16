import 'mocha';

import { contain, containAtLeastOneItemThat, Ensure, equals, not, property } from '@serenity-js/assertions';
import { actorCalled, engage } from '@serenity-js/core';
import { Browser } from '@serenity-js/protractor';
import { logging } from 'protractor';
import { FilterItems, RecordedItems, RecordItem, RemoveItem, RenameItem, Start, ToggleItem, UIActors } from '../src';

describe('TodoApp UI', function(): void {

  this.timeout(30000);

  before(() => engage(new UIActors()));

  describe('actor', () => {

    it('can record new items', () =>
      actorCalled('Alice').attemptsTo(
        Start.withAnEmptyList(),
        RecordItem.called('Walk a dog'),
        Ensure.that(RecordedItems.names(), contain('Walk a dog')),
      ));

    it('can remove the recorded items', () =>
      actorCalled('Alice').attemptsTo(
        Start.withAListContaining('Walk a dog'),
        RemoveItem.called('Walk a dog'),
        Ensure.that(RecordedItems.names(), property('length', equals(0))),
      ));

    it('can mark an item as completed', () =>
      actorCalled('Alice').attemptsTo(
        Start.withAListContaining('Buy a cake'),
        ToggleItem.called('Buy a cake'),
        FilterItems.toShow('Completed'),
        Ensure.that(RecordedItems.names(), contain('Buy a cake')),
      ));

    it('can edit an item', () =>
      actorCalled('Alice').attemptsTo(
        Start.withAListContaining('Buy a cake'),
        RenameItem.called('Buy a cake').to('Buy an apple'),
        Ensure.that(RecordedItems.names(), contain('Buy an apple')),
      ));

    it('can filter the list to show active items only', () =>
      actorCalled('Alice').attemptsTo(
        Start.withAListContaining(
          'Play guitar',
          'Read a book',
          'Write some code',
        ),
        ToggleItem.called('Write some code'),
        FilterItems.toShow('Active'),
        Ensure.that(
          RecordedItems.names(),
          equals(['Play guitar', 'Read a book']),
        ),
      ));
  });

  afterEach(() =>
    actorCalled('Alice').attemptsTo(
      Ensure.that(Browser.log(), not(containAtLeastOneItemThat(property('level', equals(logging.Level.SEVERE))))),
    ));
});
