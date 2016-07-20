import {
    Component,
    OnInit
} from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {
    REACTIVE_FORM_DIRECTIVES,
    NgForm
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { ErrorService } from '../error.service';

@Component({
    moduleId: module.id,
    selector: 'mean-login',
    templateUrl: 'profile.component.html',
    styleUrls: ['../user.component.css'],
    directives: [MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class ProfileComponent implements OnInit {
    validationError: string[] = [];
    showErrors: boolean = false;
    userId: string = localStorage.getItem('userId');

    user: any = {
        firstName: '',
        lastName: '',
        email: ''
    }

    pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private userService: UserService, private errorService: ErrorService, private router: Router) {}

    ngOnInit():any {
        this.userService.getUser(this.userId)
            .subscribe(
                data => {
                    this.user.firstName = data.firstName;
                    this.user.lastName = data.lastName;
                    this.user.email = data.email;
                },
                error => console.log('error', error)
            );
    }

    onSubmit(form: NgForm):void {
        let firstName = !form.value.firstName ? null : form.value.firstName;
        let lastName = !form.value.lastName ? null : form.value.lastName;
        let email = form.value.email;
        let user = new User(email, null, null, firstName, lastName);

        this.userService.updateUser(user, this.userId)
            .subscribe(
                data => this.router.navigate(['/messages']),
                error => {
                    this.validationError = this.errorService.onSignupErrors(error);
                    this.showErrors = true;
                }
            );
    }
    onCancel():void {
        this.router.navigate(['/messages']);
    };

}
