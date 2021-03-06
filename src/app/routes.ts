import {
    RouterConfig,
    provideRouter
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { MessageListComponent } from './messages/list/message-list.component';
import { ProfileComponent } from './user/profile/profile.component';


export const routes: RouterConfig = [
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: 'index', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user/:id', component: ProfileComponent },
    { path: 'messages', component: MessageListComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
