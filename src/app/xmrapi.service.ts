import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, setDoc, getFirestore, collection, getDoc, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { HttpClient  } from '@angular/common/http';  

import { Subject } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class XmrapiService {

db: Firestore;
myStorage: any;
storageRef: any;
ms:any;

  ApplicantsDoc: CollectionReference<DocumentData>;
  IpsDoc: CollectionReference<DocumentData>;
  OrdersDoc: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor(private http:HttpClient) {
    initializeApp(environment.firebase);
    this.db = getFirestore();
    this.ApplicantsDoc = collection(this.db, 'Applicants');
    this.IpsDoc = collection(this.db,'ips')
    this.OrdersDoc =  collection(this.db,'Orders')


    // Get Realtime Data
    onSnapshot(this.ApplicantsDoc, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
    this.myStorage = getStorage()
  }


  async getStudents() {
    const snapshot = await getDocs(this.ApplicantsDoc);
    return snapshot;  
  }
  async getUserIp(){


        return  this.http.get("http://api.ipify.org/?format=json") 

  }
  async getUsers(email:any){
    console.log("getting userd")
    var result:any = ""
    var usersRef = doc(this.db, "Applicants",email)
     var userSnapp = await getDoc(usersRef).then(function(res){
      if(res.exists()){
      result = res.data()
    }
    else result = false

    })
     return result

    
    }
    async getIpDataToLoadUserProfile(ip:any){
      var result:any = ""
      var ipRef = doc(this.db,"ips",ip)
      var ipSnap = await getDoc(ipRef).then(function(res){
        if(res.exists()){

          result = res.data()
        console.log("In tgetIpDataToLoadUserProfile ", res.data())
        }else{
          result = false
        }
        
      })
      return result
    }
  
  async addPic(e:any){
    this.storageRef = ref(this.myStorage, "firstUpload")
    uploadBytes(this.storageRef, e).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

  }
  async addDlFrontScan(e:any,id:string){
    this.ms = getStorage()
   var  nameOfFile = id+"dlFrontScan"
    this.storageRef = ref(this.ms, nameOfFile)
    const task  = uploadBytes(this.storageRef, e).then((snapshot) => {
  console.log('Uploaded a blob or file!');

});
  }
  async addDlBackScan(e:any,id:string){
   var  nameOfFile = id+"dlBackScan"
    this.storageRef = ref(this.myStorage, nameOfFile)
    uploadBytes(this.storageRef, e).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  }
  async addSSNFrontScan(e:any,id:string){
   var  nameOfFile = id+"ssnFrontSCan"
    this.storageRef = ref(this.myStorage, nameOfFile)
    uploadBytes(this.storageRef, e).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  }
  async addProofOfAddress(e:any,id:string){
   var  nameOfFile = id+"proofOfAddress"
    this.storageRef = ref(this.myStorage, nameOfFile)
    uploadBytes(this.storageRef, e).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  }


  async addStudent(name: string, age: string) {
    await addDoc(this.ApplicantsDoc, {
      name,
      age
    })
    return;
  }
  async setStudent(name: string, age: string) {
    await setDoc(doc(this.ApplicantsDoc, "NAME"), {
      name,
      age
    })
    return;
  }
async addApplicant(firstName: string, lastName: string, email:string, confirmEmail: string,
 userName:string, password: string, confirmPassword:string, address: string,state:string, city: string,
  postalCode: string,dl: string, ssn: string, dlFrontScan: any,dlBackScan: any,
  ssnFrontSCan:any,proofOfAddress:any){
  var docName = email
  await setDoc(doc(this.ApplicantsDoc,docName),{
    firstName,
    lastName,
    email,
    confirmEmail,
    userName,
    password,
    confirmPassword,
    address,
    state,
    city,
    postalCode,
    dl,
    ssn
  })

}
async initOrderDocumentForNewUser(email:any){
  var docName = email
  var orders:any = []
  await setDoc(doc(this.OrdersDoc,docName),{orders})
}

async createOrder(email:any,amountUSD:any,paymentMethod:any,xmrAddress:any,orderss:Array<any>){
  var newOrderArray = orderss
  newOrderArray.push({amountUSD,paymentMethod,xmrAddress})
  var orders = newOrderArray
  var docRef = doc(this.db,'Orders',email)
  await updateDoc(docRef,{orders})

}
async getUserOrders(email:any){
  var ordersRef = doc(this.db,"Orders",email)
  var result:any = ""
  var  orsersSnap = await getDoc(ordersRef).then(function(res){
    result = res.data()
  })
  return result
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
  async logUserIpForLogin(email: string, ip: any) {
    ip= ip.ip
    await(setDoc(doc(this.IpsDoc,ip),{
      email,
    }))

    return;
  }
  async isUserLoggedIn(ip:any){
    console.log("ip var in isUserLoggedIn ", ip)
    console.log("getting ip")
    var result:any = ""
    var usersRef = doc(this.db, "ips",ip)
     var userSnapp = await getDoc(usersRef).then(function(res){
      if(res.exists()){
      result = true
      console.log("this nigga is logged in")
    }
    else result = false
    console.log("who is this nigga ")

    })
     return result

  }

  async logUserOut(ip:any){
    var docRef = doc(this.db, "ips",ip)
    await deleteDoc(docRef)
  }

}
