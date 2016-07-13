import { Component } from '@angular/core';
import {
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './navigation/toolbar.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { MessageListComponent } from './messages/list/message-list.component';

@Component({
    moduleId: module.id,
    selector: 'meanstack2-app',
    template: `
        <mean-toolbar></mean-toolbar>
        <md-content flex class="content">
            <router-outlet></router-outlet>
        </md-content>
    `,
    styles: [`
        .content {
            padding: 5px 32px 0;
        }
    `],
    directives: [ ROUTER_DIRECTIVES, ToolbarComponent],
    precompile: [HomeComponent, RegistrationComponent, LoginComponent, MessageListComponent]
})
export class AppComponent {}
