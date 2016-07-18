export class User {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(email: string, password: string, userName?: string, firstName?: string, lastName?: string) {
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
