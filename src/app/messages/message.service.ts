import {
    Injectable,
    EventEmitter
} from '@angular/core';
import { Message } from './message';
import {
    Http,
    Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class MessageService {
    private url: string = 'http://localhost:3000';
    //private url: string = 'https://meanstack2-example.herokuapp.com';

    private headers: any = new Headers({'Content-Type': 'application/json'});
    private token: string = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    private editClicked = new EventEmitter<any>();
    messages: Message[] = [];

    constructor(private http: Http) {}

    populateForm(message: Message):any {
        let position =  this.messages.indexOf(message);
        return this.editClicked.emit({msg: message, position: position});
    }

    getEditEvent():EventEmitter<any> {
        return this.editClicked;
    }

    getMessages():Observable<Message[]> {
        return this.http.get(this.url + '/message')
            .map(
                response => {
                    const data = response.json().obj;
                    let objs: Message[] = [];

                    for (let i = 0; i < data.length; i++) {
                        let message = new Message(data[i].title, data[i].content, data[i].created_at, data[i].image, data[i]._id, data[i].user._id);
                        objs.push(message);
                    }
                    return objs;
                }
            ).catch(error => Observable.throw(error.json()));
    }

    createMessage(message: Message):Observable<Message> {
        const body = JSON.stringify(message);

        return this.http.post(this.url + '/message' + this.token, body, {headers: this.headers})
            .map(
                response => {
                    const data = response.json().obj;
                    const message = new Message(data.title, data.content, data.created_at, data.image, data._id, data.user._id);
                    this.messages.unshift(message);
                    return message;
                }
            )
            .catch(error => Observable.throw(error.json()));
    }

    updateMessage(message: Message, position):Observable<Message> {
        const body = JSON.stringify(message);

        return this.http.patch(this.url + '/message/' + message.messageId + this.token, body, {headers: this.headers})
            .map(
                response => {
                    this.messages[position] = new Message(response.json().obj.title, response.json().obj.content, response.json().obj.created_at, response.json().obj.image, response.json().obj._id, response.json().obj.user);
                    return response.json()
                })
            .catch(error => Observable.throw(error.json()));
    }

    deleteMessage(message: Message):Observable<Message> {
        return this.http.delete(this.url + '/message/' + message.messageId + this.token, {headers: this.headers})
            .map(response => {
                this.messages.splice(this.messages.indexOf(message), 1);
                return response.json();
            })
            .catch(error => Observable.throw(error.json()));
    }
}
