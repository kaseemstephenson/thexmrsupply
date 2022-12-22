import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { XmrapiService } from '../xmrapi.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'New Order', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Transaction History', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );











  constructor(private breakpointObserver: BreakpointObserver,private xmrapi: XmrapiService,private router:Router) {}
  userProfile:any = ""
  userEmail:any = ""
  userIp:any = ""
  userOrders:Array<any> = []
  amountUSD:any = 0
  paymentMethod:any =""
  xmrAddress:any = ""

 async ngOnInit(){
    var gettingIp = await this.xmrapi.getUserIp()
      gettingIp.subscribe(ipAddress => this.getUserEmail(ipAddress))

  }

  async ngDoCheck()  {
 // var checkIp = await this.isUserLoggedIn()

}


  async getUserEmail(ip:any){
    console.log(ip.ip)
    this.userIp = ip.ip
    var email =  await this.xmrapi.getIpDataToLoadUserProfile(ip.ip).then(email=> this.loadUserProfile(email))


  }
  async loadUserProfile(email:any){
    if(email == false){
            this.router.navigate(["login"])

    }
    this.userEmail = email.email
        var gettingUsers = await this.xmrapi.getUsers(this.userEmail).then(res => this.userProfile = res)
        var gettingOrders = await this.xmrapi.getUserOrders(this.userEmail).then(res => this.userOrders = res.orders)


  }
  async signOut(){
    this.xmrapi.logUserOut(this.userIp)
      this.router.navigate(["login"])



  }
  async updateOrders(email:any){
        var gettingOrders = await this.xmrapi.getUserOrders(this.userEmail).then(res => this.userOrders = res.orders)


  }











  async onSubmit(){
    alert("Only send payments from accounts that are in your name. Otherwise, it will be refunded")
          console.log(this.amountUSD,this.paymentMethod,this.xmrAddress)
          var createOrder = await this.xmrapi.createOrder(this.userEmail,this.amountUSD,this.paymentMethod,this.xmrAddress,this.userOrders)
          this.updateOrders(this.userEmail)

  }
}
