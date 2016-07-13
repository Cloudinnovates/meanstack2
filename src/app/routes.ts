import {
    RouterConfig,
    provideRouter
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { MessageListComponent } from './messages/list/message-list.component';


export const routes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: 'index', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessageListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
