import { Injectable } from '@angular/core';

@Injectable()

export class ErrorService {

    onSignupErrors(msg: any):Array<string> {
        let errors: string[] = [];
        let messages =  msg.error.errors;

        for (let i in messages) {
            errors.push(messages[i]['message']);
        }

        return errors;
    }

    onLoginError(msg: {title:string, error:string}):string {
        let error: string = msg.error
        return error;

    }

   isValidMailPattern(control: any):{[s: string]: boolean} {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!control.value.match(pattern)) {
            return { invalidMail: true };
        }
    }
}
