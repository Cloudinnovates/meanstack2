import {
    Component
} from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import {
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router';


import { UserService } from '../user/user.service';


@Component({
    moduleId: module.id,
    selector: 'mean-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css'],
    directives:  [MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class ToolbarComponent {

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
