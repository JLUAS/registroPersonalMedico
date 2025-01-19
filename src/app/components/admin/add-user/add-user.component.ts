import { Component } from '@angular/core';
import { AuthenticateUser, UserRegister } from '../../../models/User';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  modal:boolean=false


    constructor(private usersService: UsersService) {}

    user: UserRegister = { email: '', password: '', username: '', rol: '', auth: false, authCode: '', speciality: '', hSpeciality: '' };
    errMessage: string = "";
    errPassword: boolean = false;
    errUser: boolean = false;
    errGeneral: boolean = false;
    isLoading: boolean = false;
    success: boolean= false;
    succMessage:string= ""
    passwordToggle: string = "password";
    visibility:string="visibility_off"
    togglePassword(){
      if(this.passwordToggle == "password"){
        this.passwordToggle = "text"
        this.visibility="visibility"
      }else{
        this.passwordToggle= "password"
        this.visibility="visibility_off"
      }
    }

    // Función para generar un código de autenticación aleatorio de 15 caracteres
    generateAuthCode(length: number = 15): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let authCode = '';
      for (let i = 0; i < length; i++) {
        authCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return authCode;
    }

    register() {
      if (this.user.email != '' && this.user.password != '' && this.user.username != '' && this.user.username != "") {
        if (this.user.password.length < 8) {
          this.errMessage = "La contraseña debe de tener mínimo 8 caracteres";
          this.errPassword = true;
          this.errGeneral = false;
        } else if (this.user.username.length < 9) {
          this.errMessage = "Recuerda incluir nombre y ambos apellidos";
          this.errUser = true;
          this.errPassword = false;
          this.errGeneral = false;
        } else {
          if (this.user.rol == "admin") {
            this.user.speciality = "NA";
            this.user.hSpeciality = "NA";
          } else{
            this.user.speciality = "Pendiente";
            this.user.hSpeciality = "Pendiente";
          }

          // Generar el authCode antes de registrar al usuario
          this.user.authCode = this.generateAuthCode();

          // Llamar al servicio para registrar el usuario
          this.usersService.register(this.user).subscribe(
            (res: any) => {
              this.isLoading = false;
              if(res.isRegistered== true){
                this.success== true
                this.succMessage="Usuario registrado correctamente"
                const userEmail:AuthenticateUser={email:'', authCode:''}
                userEmail.email=this.user.email
                userEmail.authCode=this.user.authCode
                this.sendEmail(userEmail)
                this.user={ email: '', password: '', username: '', rol: '', auth: false, authCode: '', speciality: '', hSpeciality: '' };
              }

            },
            (err) => {
              this.isLoading = false;
              this.errPassword = false;
              if(err.isRegistered==false)this.errMessage = 'Error al agregar administrador';
              console.error(err);
            }
          );
        }
      } else {
        this.errPassword = false;
        this.errGeneral = true;
        this.errMessage = "Llena todos los campos";
      }
    }
    sendEmail(userEmail:AuthenticateUser){
      console.log("Send email", userEmail)
      this.usersService.sendEmail(userEmail).subscribe(
        (res: any) => {
          this.isLoading = false;
          if(res.isEmailSent){
            this.success== true
            this.succMessage="Correo de verificacion enviado"
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
}
