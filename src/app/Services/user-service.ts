import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../Models';

@Injectable()
export class UserService {

  environment: string = 'http://localhost:4200/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.environment + `/users`);
  }

  getById(id: number) {
    return this.http.get(this.environment + `/users/` + id);
  }

  register(user: User) {
    return this.http.post(this.environment + `/users/register`, user);
  }

  update(user: User) {
    return this.http.put(this.environment + `/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(this.environment + `/users/` + id);
  }
}
