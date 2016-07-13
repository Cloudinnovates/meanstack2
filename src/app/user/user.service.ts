import {
    Injectable,
    EventEmitter
} from '@angular/core';
import {
    Http,
    Headers
} from '@angular/http';
import { User } from './user';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class UserService {

    private url: string = 'http://localhost:3000';
    //private url: string = 'https://meanstack2-example.herokuapp.com';
    private userLoggedIn = new EventEmitter<any>();
    private userLoggedOut = new EventEmitter<any>();

    constructor(private http: Http) {}

    signup(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url + '/user', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));

    }

    signin(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url + '/user/signin', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));

    }

    signOut(): void {
        localStorage.clear();
        this.userLoggedOut.emit(null);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    getSignedOutEvent(): EventEmitter<any> {
        return this.userLoggedOut;
    }

    getSignedInEvent(): EventEmitter<any> {
        return this.userLoggedIn;
    }
}