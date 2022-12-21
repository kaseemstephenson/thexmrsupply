import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { XmrapiService } from '../xmrapi.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb: FormBuilder,
      private xmrapi: XmrapiService,private router:Router) {}
async ngOnInit(){
    console.log("In function logginInCheck")
    var gettingIp = await this.xmrapi.getUserIp()
      gettingIp.subscribe(ipAddress => this.setIp(ipAddress))
      //checkIp.subscribe(res => console.log(res))


}
async ngDoCheck()  {
  console.log(this.loggedInCheck)
 // var checkIp = await this.isUserLoggedIn()
  if(this.loggedInCheck == true){
      this.router.navigate(["home"])

  }

}

async setIp(ip:any){
  this.ip = ip.ip
  console.log(this.ip)
        var checkingIp = await this.xmrapi.isUserLoggedIn(this.ip).then(res => this.loggedInCheck = res)

}
async isUserLoggedIn(){
      var checkingIp = await this.xmrapi.isUserLoggedIn(this.ip).then(res => this.loggedInCheck = res)
      console.log(this.loggedInCheck)
      return this.loggedInCheck

}
loggedInCheck:any = ""
  ip:any = ""
  email:string = ""
  password:string = ""
  userProfile:any = ""
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

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


  async onSubmit(): Promise<any>{

    var gettingUsers = await this.xmrapi.getUsers(this.email).then(res => this.userProfile = res)
    if(this.userProfile == false){
      alert("User does not exist... Sign Up!")
    }else if(this.userProfile.password == this.password){

              var gettingIp = await this.xmrapi.getUserIp()
               gettingIp.subscribe(ipAddress => this.xmrapi.logUserIpForLogin(this.email,ipAddress))
               this.router.navigate(["home"])


      //alert("Welcome " + this.userProfile.firstName)
    }else{
      alert("Sorry, the password you entered in jbjbincorrect")
    }


  }
}
