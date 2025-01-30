import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

class User {
    name: string;
    email: string;
    private tasks : Task[];
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.tasks = [];
    }

    addTask(task:Task){
        this.tasks.push(task)
    }
    removeTaskById(id:number){
        this.tasks.filter((e, i) => e.getId() !== id);
    }

}

class Task{
    private id;
    constructor(id:number){
        this.id = id;
    }

    getId(){
        return this.id
    }

}

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private users : User[];

    constructor() {
        console.log("init");
        this.users = [];
    }

    addUser(name: string, email: string) {
        this.users.push(new User(name, email));
    }

    getUsers(){
        return this.users
    }

    deleteUser(user: User) {
        this.users = this.users.filter((e) => e !== user);
    }

    editUser(user: User, name: string, email: string) {
        user.name = name;
        user.email = email;
    }


}