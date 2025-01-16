import { Component, OnInit } from '@angular/core';
import { AuthenticateUser } from '../../../models/User';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponentUser  implements OnInit{
  constructor(private usersService: UsersService){ }
  authenticateUser:AuthenticateUser= {email:'', authCode:''}
  isAuth:boolean=false
  isTimeoutPassed:boolean=false
  errMessage:string=""
  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      console.log("storedEm",storedEmail)
      this.authenticateUser.email = storedEmail;
    }
    console.log("a",storedEmail)
    this.usersService.isAuthenticated(this.authenticateUser.email).subscribe(
      (res: any) => {
        if (res.isAuthenticated) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      },
      (err) => {
        console.log("ENTRO")
        console.error(err)
      }
    )
    setTimeout(() => {
      this.isTimeoutPassed = true;
    }, 1000);
  }
  authenticateUserFun(){
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.authenticateUser.email = storedEmail;
    }
    this.usersService.authenticateUser(this.authenticateUser).subscribe(
      (res: any) => {
        console.log(res.isAuthenticated)
        if (res.isAuthenticated) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      },
      (err) => {
        this.errMessage="Codigo incorrecto"
        console.error(err)
      }
    )
  }
}
