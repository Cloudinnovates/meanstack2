/// <reference path="../../typings.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './routes';
import {
    LocationStrategy,
    HashLocationStrategy
} from '@angular/common';
import { provideForms, disableDeprecatedForms } from '@angular/forms';
import { ErrorService } from './user/error.service';
import { UserService } from './user/user.service';
import { MessageService } from './messages/message.service';

enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    UserService,
    ErrorService,
    MessageService,
    disableDeprecatedForms(),
    provideForms(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch((err: any) => console.error(err));
