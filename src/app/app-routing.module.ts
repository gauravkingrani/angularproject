import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '',loadChildren:()=>import('./signin/lazy/lazy.module').then(m=> m.LazyModule),canActivate:[AuthGuard]},
  {path: 'login',component:SigninComponent},
  {path: 'admin',component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
