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


  }
  async signOut(){
    this.xmrapi.logUserOut(this.userIp)
      this.router.navigate(["login"])



  }











  onSubmit(){
    alert("Only send payments from accounts that are in your name. Otherwise, it will be refunded")
  }
}
