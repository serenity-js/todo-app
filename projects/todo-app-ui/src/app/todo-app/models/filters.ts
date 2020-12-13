import { TodoItem } from '@serenity-dojo/todo-app-domain';

export abstract class Filter {
    static fromString(name: string): Filter {
        switch (name) {
            case 'active':
                return new ActiveItems();
            case 'completed':
                return new CompletedItems();
            case 'all':
            default:
                return Filter.default();
        }
    }

    static default(): Filter {
        return new AllItems();
    }

    constructor(public readonly name: string) {
    }

    abstract allows(todo: TodoItem): boolean;
}

class AllItems extends Filter {

    constructor() {
        super('all');
    }

    allows(todo: TodoItem): boolean {
        return true;
    }
}

class ActiveItems extends Filter {

    constructor() {
        super('active');
    }

    allows(todo: TodoItem): boolean {
        return ! todo.completed;
    }
}

class CompletedItems extends Filter {

    constructor() {
        super('completed');
    }

    allows(todo: TodoItem): boolean {
        return todo.completed;
    }
}

