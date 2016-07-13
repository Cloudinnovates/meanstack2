import {
    Component,
    OnInit
} from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { MessageComponent } from '../detail/message.component';
import { MessageInputComponent } from '../input/message-input.component';

@Component({
    moduleId: module.id,
    selector: 'mean-messages-list',
    templateUrl: 'message-list.component.html',
    styleUrls: ['message-list.component.css'],
    directives: [MessageComponent, MessageInputComponent]
})

export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService) {}

    ngOnInit():any {
        return this.messageService.getMessages()
            .subscribe(
                messages => {
                    this.messages = messages;
                    this.messageService.messages = this.messages;
                },
                error => {
                    console.log(error);
                }
            );
    }
}
