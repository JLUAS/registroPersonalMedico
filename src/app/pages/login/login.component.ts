import { Component } from '@angular/core';
import { UserLogin } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private usersService:UsersService, private router: Router){}

  user:UserLogin = {email:'', password:''}
  errMessage:string = ""
  errPassword:boolean = false
  errGeneral:boolean = false
  isLoading:boolean = false
  passwordToggle:string = "password"

  togglePassword(){
    if(this.passwordToggle == "password"){
      this.passwordToggle = "text"
    }else{
      this.passwordToggle= "password"
    }
  }

  login(){
    if(this.user.email != '' && this.user.password != ''){
      if(this.user.password.length < 8){
        this.errMessage="La contraseña debe de tener minimo 8 caracteres"
        this.errPassword=true
        this.errGeneral=false
      }else{
        this.usersService.login(this.user).subscribe(
          (res: any) => {
            this.isLoading = false
            localStorage.setItem('token', res.token)
            console.log(res.token)
            localStorage.setItem('rol', res.rol)
            console.log(res.rol)
            localStorage.setItem('email', this.user.email)
            if(res.rol== "admin")this.router.navigate(['/dashboard'])
            if(res.rol=="user")this.router.navigate(['/registrar'])
          },
          (err) => {
            this.isLoading = false
            this.errPassword= false
            this.errGeneral= true
            this.errMessage = 'Error al iniciar sesión'
            console.error(err)
          }
        );
      }
    }else{
      this.errPassword=false
      this.errGeneral=true
      this.errMessage = "Llena todos los campos"
    }
  }
}
