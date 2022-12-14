import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { XmrapiService } from '../xmrapi.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    constructor(private fb: FormBuilder,
      private xmrapi: XmrapiService,) {}
   
  url: any; //Angular 11, for stricter type
  msg = "";
  firstName:string = "";
  lastName: string = "";
   email:string = "";
   confirmEmail: string = "";
 userName:string = "";
 password: string = "";
 confirmPassword:string = "";
 address: string = "";
 state: string = "";
 city: string = "";
  postalCode: string = "";
  dl: string = "";
  ssn: string = "";
  dlFrontScan: any = "";
  dlBackScan: any = null;
  ssnFrontScan:any = null;
  proofOfAddress:any = null;

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.required],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;
  uploadTest(event:any){
    this.xmrapi.addPic(event.target.files[0]);

  }
  saveDlFrontScan(e:any){
    console.log(e.target.files)
    this.dlFrontScan = e.target.files[0]
        
  }
  saveDlBackScan(e:any){
    
    this.dlBackScan = e.target.files[0]
  }
  saveSSNFrontScan(e:any){
    this.ssnFrontScan = e.target.files[0]
  }
  saveProofOfAddress(e:any){
    this.proofOfAddress = e.target.files[0]
  }
  

  

  onSubmit(): void {
    console.log(this.firstName)
    this.xmrapi.addDlFrontScan(this.dlFrontScan,this.email)
        this.xmrapi.addDlBackScan(this.dlBackScan,this.email)
    this.xmrapi.addSSNFrontScan(this.ssnFrontScan,this.email)
    this.xmrapi.addProofOfAddress(this.proofOfAddress,this.email)

 this.xmrapi.addApplicant(this.firstName,this.lastName,this.email,this.confirmEmail,this.userName,this.password,
  this.confirmPassword,this.address,this.city,this.state,this.postalCode,this.dl,this.ssn,this.dlFrontScan,this.dlBackScan,this.ssnFrontScan,this.proofOfAddress);
  this.xmrapi.initOrderDocumentForNewUser(this.email)
}







onFileSelected() {
  console.log("IN FILE SLECED")
  const inputNode: any = document.querySelector('#file');

  if (typeof (FileReader) !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.url=reader.result
      console.log(e.target.result);
    };

    reader.readAsArrayBuffer(inputNode.files[0]);
  }
}
//selectFile(event) { //Angular 8
  selectFile(event: any) {
  console.log("SDSIDJSIDJSID") //Angular 11, for stricter type
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    
    var mimeType = event.target.files[0].type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
          console.log(event.target.files[0])

    
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result; 
    }
  }
  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

}
