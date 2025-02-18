import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../components/action-bar/action-bar.component';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ButtonModule, ActionBarComponent],
})
export class UserManagerComponent {
  addUserForm: FormGroup;
  editUserForm: FormGroup;
  
  is_adding_user: boolean = false;
  is_editing_user: boolean = false;
  user_to_edit: any = null;

  constructor(private fb: FormBuilder, private router: Router, public service: UserService) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  continuer(){
    this.router.navigate(['./règles_analyse'])
  }

  addUser() {
    console.log("addUser")
    this.is_adding_user = true;
  }

  editUser(user: any) {
    this.is_editing_user = true;
    this.user_to_edit = user;
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  cancelEditUser() {
    this.is_editing_user = false;
    this.user_to_edit = null;
    this.editUserForm.reset();
  }

  saveEditUser(user: any) {
    if (this.editUserForm.invalid) return;

    const { name, email } = this.editUserForm.value;
    this.service.editUser(user, name, email);
    this.is_editing_user = false;
    this.user_to_edit = null;
    this.editUserForm.reset();
    console.log(this.service.getUsers());
  }

  deleteUser(user: any) {
    this.service.deleteUser(user);
    console.log(this.service.getUsers());
  }

  saveUser() {
    console.log(this.addUserForm.value)
    if (this.addUserForm.invalid) 
    {
      console.log("invalid")
      return
    };

    const { name, email } = this.addUserForm.value;
    this.service.addUser(name, email);
    this.addUserForm.reset();
    this.is_adding_user = false;
    console.log(this.service.getUsers());
  }

  cancelAddUser() {
    this.is_adding_user = false;
    this.addUserForm.reset();
  }

  actionButtons = [
    { label: 'Continuer', action: () => this.continuer() }
  ];
}