import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class XmrapiService {

db: Firestore;
  ApplicantsDoc: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() {
    initializeApp(environment.firebase);
    this.db = getFirestore();
    this.ApplicantsDoc = collection(this.db, 'Applicants');

    // Get Realtime Data
    onSnapshot(this.ApplicantsDoc, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }


  async getStudents() {
    const snapshot = await getDocs(this.ApplicantsDoc);
    return snapshot;
  }


  async addStudent(name: string, age: string) {
    await addDoc(this.ApplicantsDoc, {
      name,
      age
    })
    return;
  }
async addApplicant(firstName: string, lastName: string, email:string, confirmEmail: string,
 userName:string, password: string, confirmPassword:string, address: string, city: string,
  postalCode: string,dl: string, ssn: string, dlFrontScan: any,dlBackScan: any,
  ssnFrontSCan:any,proofOfAddress:any){

}


  async deleteStudent(docId: string) {
    const docRef = doc(this.db, 'students', docId)
    await deleteDoc(docRef);
    return;
  }

  async updateStudent(docId: string, name: string, age: string) {
    const docRef = doc(this.db, 'students', docId);
    await updateDoc(docRef, { name, age })
    return;
  }
}