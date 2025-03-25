import { Injectable } from "@angular/core";

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
    removeTaskById(id: number) {
        this.tasks = this.tasks.filter((e) => e.getId() !== id);
      }
    hasTask(taskId: number): boolean {
        return this.tasks.some(task => task.getId() === taskId);
    }
    getTask() : Task[]{
        return this.tasks
    }

}

export class Task{
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
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
    getUsersWithTask(taskId: number): User[] {
        return this.users.filter(user => user.hasTask(taskId));  // Filtrer les utilisateurs qui ont cette tâche
    }

}