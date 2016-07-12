/// <reference path="../../typings.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {
    LocationStrategy,
    HashLocationStrategy
} from '@angular/common';
import { provideForms, disableDeprecatedForms } from '@angular/forms';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch((err: any) => console.error(err));