import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './signin/signin.component';


import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppConfig } from 'src/app/app.config';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from './auth/guard/auth.guard';

//Add this function as initiating load method first
function initConfig(config: AppConfig){
  return () => config.load()
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    SigninComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [CommonServiceService,AuthGuard,AppConfig,{ provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
