import { Component } from '@angular/core';
import {
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { MessageListComponent } from './messages/list/message-list.component';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';

@Component({
    moduleId: module.id,
    selector: 'meanstack2-app',
    template: `
        <div layout="column" layout-fill>
            <mean-navigation></mean-navigation>
            <md-content flex layout-fill class="content">
                <router-outlet></router-outlet>
            </md-content>
               
        </div>
    `,
    styles: [`
       .content {
            margin-top: 100px;
            padding: 5px 32px 0;
        }
    `],
    directives: [ ROUTER_DIRECTIVES, NavigationComponent, MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES],
    precompile: [HomeComponent, RegistrationComponent, LoginComponent, MessageListComponent]
})
export class AppComponent {}
