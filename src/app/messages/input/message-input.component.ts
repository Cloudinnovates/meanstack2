import {
    Component,
    OnInit,
} from '@angular/core';
import { MessageService } from '../message.service';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MdButton} from '@angular2-material/button/button';
import {
    REACTIVE_FORM_DIRECTIVES,
    Validators,
    FormGroup,
    FormBuilder
} from '@angular/forms';
import { Message } from '../message';

@Component({
    moduleId: module.id,
    selector: 'mean-message-input',
    templateUrl: 'message-input.component.html',
    styleUrls: ['message-input.component.css'],
    directives: [MD_CARD_DIRECTIVES, MdButton, MD_INPUT_DIRECTIVES, MdIcon, REACTIVE_FORM_DIRECTIVES],
    providers: [MdIconRegistry]
})

export class MessageInputComponent implements OnInit {
    messageForm: FormGroup;
    msgTitle: string = '';
    msgContent: string = '';
    formShowing: boolean = false;
    formAction: string;
    msgPosition: number;
    message: Message;

    constructor(private messageService: MessageService, private fb: FormBuilder) {}

    ngOnInit():FormGroup {
        this.messageService.getEditEvent()
            .subscribe(
                data => {
                    this.formAction = 'update';
                    this.formShowing = true;
                    this.message = data.msg;
                    this.msgTitle = data.msg.title;
                    this.msgContent = data.msg.content;
                    this.msgPosition = data.position;
                }
            );
        return this.messageForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
        });
    }

    onSubmit():void {
        if (this.formAction === 'create') {
            let created_at = Date.now();
            let image = 'http://lorempixel.com/400/220/' + this.createImgCategory();
            let message = new Message(this.messageForm.value.title, this.messageForm.value.content, created_at, image);

            this.messageService.createMessage(message).subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            let message = new Message(this.messageForm.value.title, this.messageForm.value.content, this.message.created_at, this.message.image, this.message.messageId, this.message.userId);

            this.messageService.updateMessage(message, this.msgPosition)
                .subscribe(
                    data => console.log(data),
                    error => {
                        console.log(error);
                    }
                );
        }
        this.resetForm();
    }

    toggleForm():boolean {
        this.msgTitle = '';
        this.msgContent = '';
        this.formAction = 'create';
        return this.formShowing = !this.formShowing;
    }

    onCancel():void {
        this.resetForm();
    }

    private createImgCategory():string {
        let categories = ['abstract', 'city', 'people', 'animals', 'food', 'nature', 'business', 'nightlife', 'cats', 'fashion', 'technics'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    private resetForm():void {
        this.msgTitle = '';
        this.msgContent = '';
        this.formShowing = false;
    }
}
