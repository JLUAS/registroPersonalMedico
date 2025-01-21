import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NavComponent } from './components/admin/nav/nav.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { HomeComponentUser } from './pages/user/home/home.component';
import { AuthGuardUserService } from './services/auth-guard-user.service';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import {MatIconModule} from '@angular/material/icon';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { InformacionComponent } from './components/user/informacion/informacion.component';
import { DocumentosComponent } from './pages/user/documentos/documentos.component';
import { LeaderComponent } from './pages/leader/leader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    HomeComponentUser,
    UserNavComponent,
    UsersComponent,
    UserTableComponent,
    AddUserComponent,
    InformacionComponent,
    DocumentosComponent,
    LeaderComponent
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
