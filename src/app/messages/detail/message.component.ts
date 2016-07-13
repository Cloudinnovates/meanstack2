import {
    Component,
    Input
} from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MdButton} from '@angular2-material/button/button';

@Component({
    moduleId: module.id,
    selector: 'mean-message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.css'],
    directives: [MD_CARD_DIRECTIVES, MdButton, MD_INPUT_DIRECTIVES, MdIcon],
    providers: [MdIconRegistry]
})

export class MessageComponent {
    @Input() message: Message;

    constructor(private messageService: MessageService) {}

    messageBelongsToUser():boolean {
        return !this.message.userId || this.message.userId === localStorage.getItem('userId');
    }

    onEdit():Message {
        return this.messageService.populateForm(this.message);
    }

    onDelete():any {
       return this.messageService.deleteMessage(this.message)
           .subscribe(
               data => console.log(data),
               error => {
                   console.log(error);
               }
           );
    }
}
