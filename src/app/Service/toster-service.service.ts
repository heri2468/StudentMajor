import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor(private ToastrService: ToastrService) { }
  showLoginSucces(){
    this.ToastrService.success('Login Successful');
  }

  showLoginError(){
    this.ToastrService.error('Invalid email or password');
  }

  showLoginInfo(){
    this.ToastrService.info('Please varify your email.');
  }

  showRegistrationSucces(){
    this.ToastrService.success('Registration Successful');
  }

  showRegistrationWarning(){
    this.ToastrService.warning('The email address is already in use by another account.');
  }
  showUserLoggedOutInfo(){
    this.ToastrService.info('User successfully logged out.');
  }
  showForgotPasswordInfo(){
    this.ToastrService.info('Link has been sent on your registred email. Please varify it.');
  }
  showForgotPasswordError(){
    this.ToastrService.error('Something went wrong. Not able to send mail to your email.');
  }

  //add-student components toastrs
  showAddStudentWarning(){
    console.log("Please fill all input fields.")
    this.ToastrService.warning('Please fill all input fields.')
  }

  //student-list components toastrs
  showStudentDeleteSucces(){
    this.ToastrService.success('Student has been deleted successfully.');
  }

  showStudentAddSucces(){
    this.ToastrService.success('Student has been added successfully.');
  }

  showTeacherAddSuccess(){
    this.ToastrService.success('Teacher has been added successfully.');
  }

}
