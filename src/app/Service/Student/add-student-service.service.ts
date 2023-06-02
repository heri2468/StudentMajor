import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
  query,
  setDoc,} from '@angular/fire/firestore';
import { Student } from 'src/app/modal/student';
import { AuthService } from 'src/app/shared/auth.service';
import  firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddStudentServiceService {

  constructor(private fireStore:Firestore,private fireauth:AngularFireAuth) { }

  RegisterStudent(studentData:Student){
    return this.fireauth.createUserWithEmailAndPassword(studentData.email,"123456789")
  }
  AddStudentDetails(studentData:Student){
    const ref = doc(this.fireStore, 'Student', studentData.uid);
    return setDoc(ref,studentData);
  }

  updateStudentDetails(proctorId:string,studentData:Student){
    const ref = doc(this.fireStore, 'Student', studentData.uid);
    return updateDoc(ref,{'proctorID':proctorId})
  }

  logOutSecondaryAndLogInPrimary(){
    var userName = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    if(userName == null || password == null)return;
    
    return this.fireauth.signInWithEmailAndPassword(userName,password)
  }
  async SendMail(){
    // const client = new SMTPClient({
    //   user: 'admin.SIT@gmail.com',
    //   password: '123456789',
    //   host: 'smtp.your-email.com',
    //   ssl: true,
    // });
    // const message = await client.sendAsync({
    //   text: 'i hope this works',
    //   from: 'sanjayas430@gmail.com',
    //   to: '1by18ec144@bmsit.in',
    //   subject: 'testing emailjs',
    // });
    // console.log(message)
  }
  
}
