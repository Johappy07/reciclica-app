import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (email === "error@email.com") {
          observer.error({message: "Email not found"});
        } else {
          observer.next();
          observer.complete();
        }
      }, 3000);
    });
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      setTimeout(() => {
        if (email === "error@email.com" ){
          observer.error({message: "User not found"});
        } else {
          const user = new User();
          user['id'] = "anyId";
          observer.next(user);
          observer.complete();
        }
      }, 3000);
    });
  }
}

