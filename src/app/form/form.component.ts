import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  profileForm: FormGroup;

  userList: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      mobile: new FormControl(''),
      phone: new FormControl(''),
    });

    this.userService.listenOnEdit.subscribe((data) => {
      this.profileForm.patchValue(data);
    });
  }

  onSubmit() {}

  addUser() {
    var formValue = this.profileForm.getRawValue();
    // console.log("formValue: ", formValue);

    let user: User = new User(formValue);
    // console.log("user: ", user);

    if (typeof user.id === 'number') {
      //EDIT
      this.userList[
        this.userList.indexOf(this.userList.find((u) => u.id === user.id))
      ] = user;
      this.profileForm.reset();
      return;
    }
    user.id = this.userList.length;

    this.userList.push(user);
    // console.log(this.userList);

    this.profileForm.reset();
  }

  addUserWithService() {
    var formValue = this.profileForm.getRawValue();

    let user: User = new User(formValue);

    if (!user.id) {
      user.id = Math.random();
    }

    this.userService.insertData(user);

    this.profileForm.reset();
  }

  // updateUser(userData){
  //   this.profileForm.patchValue(userData);
  // }
}
