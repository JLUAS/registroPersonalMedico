import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/admin/home/home.component';
const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:HomeComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
