import { Component, OnInit } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card/card';
import {
    REACTIVE_FORM_DIRECTIVES,
    Validators,
    FormGroup,
    FormBuilder
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
    templateUrl: 'login.component.html',
    styleUrls: ['../user.styles.css'],
    directives: [MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class ProfileComponent implements OnInit {
    loginForm: FormGroup;
    validationError: string;
    showErrors: boolean = false;

    constructor(private fb: FormBuilder, private userService: UserService, private errorService: ErrorService, private router: Router) {}

    ngOnInit():FormGroup {
        return this.loginForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.errorService.isValidMailPattern
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])]
        });
    }

    onSubmit():void {}

}
