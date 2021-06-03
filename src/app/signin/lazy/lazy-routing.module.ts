import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guard/auth.guard';
import { HomeComponent } from 'src/app/signin/home/home.component';
import { RegisterComponent } from 'src/app/signin/register/register.component';
import { UsersComponent } from 'src/app/signin/users/users.component';

const routes: Routes = [
  {path: '',component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'register',component:RegisterComponent},
  {path: 'users',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
