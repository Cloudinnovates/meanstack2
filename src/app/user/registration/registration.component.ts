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
    selector: 'mean-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['../user.component.css'],
    directives: [MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    validationErrors: string[] = [];
    showErrors: boolean = false;

    constructor(private fb: FormBuilder, private userService: UserService, private errorService: ErrorService, private router: Router) {}

   ngOnInit():FormGroup {
        return this.registrationForm = this.fb.group({
            userName: ['', Validators.required],
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

    onSubmit():void {
        this.showErrors = false;

        const user = new User(this.registrationForm.value.email, this.registrationForm.value.password, this.registrationForm.value.userName)

        this.userService.signup(user)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.validationErrors = this.errorService.onSignupErrors(error);
                    this.showErrors = true;
                }
            );
    }
}
