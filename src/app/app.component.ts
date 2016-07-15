import { Component } from '@angular/core';
import {
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { MessageListComponent } from './messages/list/message-list.component';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';

@Component({
    moduleId: module.id,
    selector: 'meanstack2-app',
    template: `
        <md-sidenav-layout layout="column" layout-fill>
            <mean-navigation></mean-navigation>
            <md-content flex layout-fill>
                <router-outlet></router-outlet>
            </md-content>
               
        </md-sidenav-layout>
    `,
    styles: [`
        md-content {
            margin-top: 100px;
            padding: 5px 32px 0;
        }
    `],
    directives: [ ROUTER_DIRECTIVES, ToolbarComponent, MD_SIDENAV_DIRECTIVES],
    precompile: [HomeComponent, RegistrationComponent, LoginComponent, MessageListComponent]
})
export class AppComponent {}
