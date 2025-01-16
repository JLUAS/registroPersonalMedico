import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/admin/home/home.component';
import { HomeComponentUser } from './pages/user/home/home.component';
import { AuthGuardUserService } from './services/auth-guard-user.service';
const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:HomeComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard/health', component:HomeComponentUser, canActivate: [AuthGuardUserService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
