import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { __values } from 'tslib';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() userArr: User[] = [];
  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.onInsert.subscribe((data) => {
      const findUserIdxInList = this.userArr.findIndex((a) => a.id == data.id);

      // edit
      if (findUserIdxInList != -1) {
        this.userArr[findUserIdxInList] = data;
      } 
      // insert
      else {
        this.userArr.push(data);
      }
    });
  }

  deleteUser(i: number) {
    this.userArr.splice(i, 1);
    // this.userArr = this.userArr.filter(a => a.id != i)
  }

  // onEditUser(values) {
  //   this.userChange.emit(values);
  // }

  updateUserWithService(user) {
    this.userService.onEditClickData(user);
  }
}
