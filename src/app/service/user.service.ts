import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private insertSubject: Subject<any> = new Subject();
  private updateSubject: Subject<any> = new Subject();

  public get onInsert() {
    return this.insertSubject.asObservable();
  }

  public get listenOnEdit() {
    return this.updateSubject.asObservable();
  }

  insertData(data) {
    this.insertSubject.next(data);
  }

  onEditClickData(data) {
    this.updateSubject.next(data);
   
  }
}
