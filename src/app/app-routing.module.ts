import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/admin/home/home.component';
import { HomeComponentUser } from './pages/user/home/home.component';
import { AuthGuardUserService } from './services/auth-guard-user.service';
import { UsersComponent } from './pages/admin/users/users.component';
import { DocumentosComponent } from './pages/user/documentos/documentos.component';
const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:HomeComponent, canActivate: [AuthGuardService]},
  {path: 'usuarios', component:UsersComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard/health', component:HomeComponentUser, canActivate: [AuthGuardUserService]},
  {path: 'dashboard/health/documentos', component:DocumentosComponent, canActivate: [AuthGuardUserService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
