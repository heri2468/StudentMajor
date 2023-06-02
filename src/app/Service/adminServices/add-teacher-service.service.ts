import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,} from '@angular/fire/firestore';
import { Teacher } from 'src/app/modal/teacher';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddTeacherServiceService {
  constructor(private fireauth:AngularFireAuth,private fireStore:Firestore) { }
  RegisterTeacher(teacherData:Teacher) {
    return this.fireauth.createUserWithEmailAndPassword(teacherData.email,"123456789")
  }

  AddTeacherDetails(teacherData:Teacher){
    const ref = doc(this.fireStore, 'Teacher', teacherData.uid);
    return setDoc(ref,teacherData);
  }

  logOutSecondaryAndLogInPrimary(){
    var userName = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    if(userName == null || password == null)return;
    return this.fireauth.signInWithEmailAndPassword(userName,password)
  }

}
