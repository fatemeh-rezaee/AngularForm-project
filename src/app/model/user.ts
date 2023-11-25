export class User {

    constructor(data: User) {
        Object.assign(this, data);
    }


  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  mobile: number;
  phone: number;
}
