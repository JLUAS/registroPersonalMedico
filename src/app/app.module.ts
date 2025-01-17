import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NavComponent } from './components/admin/nav/nav.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { HomeComponentUser } from './pages/user/home/home.component';
import { AuthGuardUserService } from './services/auth-guard-user.service';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import {MatIconModule} from '@angular/material/icon';
import { UsersComponent } from './pages/admin/users/users.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    HomeComponentUser,
    UserNavComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    UsersService,
    AuthGuardService,
    AuthGuardUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
