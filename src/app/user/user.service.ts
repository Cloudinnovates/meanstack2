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

    //private url: string = 'http://localhost:3000';
    private url: string = 'https://meanstack2-example.herokuapp.com';
    private token: string = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    private userLoggedIn = new EventEmitter<any>();
    private userLoggedOut = new EventEmitter<any>();
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    signup(user: User): Observable<any> {
        const body = JSON.stringify(user);

        return this.http.post(this.url + '/user', body, {headers: this.headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));

    }

    signin(user: User): Observable<any> {
        const body = JSON.stringify(user);

        return this.http.post(this.url + '/user/signin', body, {headers: this.headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));

    }

    getUser(userId: string): Observable<any> {
        return this.http.get(this.url + '/user/' + userId + this.token)
            .map(response => {
                const data = response.json().obj;
                const user = new User(data.email, null, null, data.firstName, data.lastName);
                return user;
            })
            .catch(error => Observable.throw(error.json()));
    }

    updateUser(user: User, userId: string) {
        const body = JSON.stringify(user);

        return this.http.patch(this.url + '/user/' + userId + this.token, body, {headers: this.headers})
            .map(
                response => {
                    return response;
                }
            )
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
