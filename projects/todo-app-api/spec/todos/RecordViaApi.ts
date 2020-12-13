import { SerialisedTodoItem, TodoItem } from '@serenity-dojo/todo-app-domain';
import { Activity, PerformsActivities, TakeNote, Task } from '@serenity-js/core';
import { LastResponse, PostRequest, Send } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';

export class RecordViaApi extends Task {
    private optionalActivities: Activity[] = [];

    static item(todo: TodoItem): RecordViaApi {
        return new RecordViaApi(todo);
    }

    andNoteItsIdAs(name: string): Task {
        this.optionalActivities.push(
            TakeNote.of(
                LastResponse.body<SerialisedTodoItem>().map(actor => item => item.id)
            ).as(name)
        );

        return this;
    }

    constructor(private readonly todo: TodoItem) {
        super();
    }

    performAs(actor: PerformsActivities): PromiseLike<void> {
        return actor.attemptsTo(
            Send.a(PostRequest.to('/todos').with(this.todo.toJSON())),
            Ensure.that(LastResponse.status(), equals(201)),
            ...this.optionalActivities,
        );
    }

    toString(): string {
        return `#actor uses the API to record ${ this.todo }`;
    }
}
