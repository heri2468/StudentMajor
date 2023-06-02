import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Announcement } from 'src/app/modal/announcement';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private basePath = '/uploads'
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,private firestore: Firestore) { }

  pushFileToStorage(fileToUpload: File,eventDetails:Announcement): Observable<number | undefined>{
    const filePath = `${this.basePath}/${fileToUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileToUpload);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          eventDetails.Attachements = downloadURL
          this.addAnnouncement(eventDetails)
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  addAnnouncement(eventDetails:Announcement){
    const ref = collection(this.firestore, 'Announcements');
    addDoc(ref,eventDetails);
  }

  getAllAnnouncement(): Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref)
    return collectionData(queryAll) as Observable<Announcement[]>
  }

  getAllAnnouncementForTeacher():Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref,where("SenderRole","==","Admin"))
    return collectionData(queryAll) as Observable<Announcement[]>
  }

  getTopThreeEvents():Observable<Announcement[]>{
    const ref = collection(this.firestore, 'Announcements');
    const queryAll = query(ref,orderBy('EventDate','desc'))
    return collectionData(queryAll) as Observable<Announcement[]>
  }
}
