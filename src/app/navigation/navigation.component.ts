import {
    Component
} from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import {
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router';
import { UserService } from '../user/user.service';
import { MessageListComponent } from '../messages/list/message-list.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { LoginComponent } from '../user/login/login.component';
import { RegistrationComponent } from '../user/registration/registration.component';
import { HomeComponent } from '../home/home.component';

@Component({
    moduleId: module.id,
    selector: 'mean-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.css'],
    directives:  [MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES, ROUTER_DIRECTIVES],
    precompile: [HomeComponent, RegistrationComponent, LoginComponent, ProfileComponent, MessageListComponent]
})

export class NavigationComponent {

    constructor(private userService: UserService, private router: Router) {}

    onSelectRoute(route: string):void {
        this.router.navigate([route]);
    }

    isAuth():boolean {
        return this.userService.isAuthenticated();
    }

    logOut():void {
        this.userService.signOut();
        this.router.navigate(['index']);
    }
}
