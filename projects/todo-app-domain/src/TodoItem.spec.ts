import 'mocha';
import { expect } from 'chai';
import { TodoItem } from './TodoItem';

describe('TodoApp domain', () => {

  describe('TodoItem', () => {

    it('can be serialised to JSON', () => {

      const item = new TodoItem(1, 'Read a book', false);

      expect(item.toJSON()).to.deep.equal({
        id: 1,
        name: 'Read a book',
        completed: false,
      });
    });

    it('can be de-serialised from JSON', () => {

      const result = TodoItem.fromJSON({
        id: 1,
        name: 'Read a book',
        completed: false,
      });

      expect(result.id).to.deep.equal(1);
      expect(result.name).to.deep.equal('Read a book');
      expect(result.completed).to.deep.equal(false);
    });

    it('can be cloned', () => {
      const original = new TodoItem(1, 'Read a book', false);
      const clone = original.clone();

      expect(clone.id).to.equal(original.id);
      expect(clone.name).to.equal(original.name);
      expect(clone.completed).to.equal(original.completed);

      expect(clone.equals(original)).to.equal(true);
    });

    it('has a sensible description when cast to string', () => {
      const item = new TodoItem(1, 'Read a book', false);

      expect(item.toString()).to.equal('TodoItem(completed=false, id=1, name=Read a book)');
    });
  });
});
