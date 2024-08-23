import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ODataModule } from 'angular-odata';

import { authInterceptorProviders as AuthInterceptorProviders } from './interceptors/auth.interceptor';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { VolunteerProfilesComponent } from './components/visitor/volunteer-profiles/volunteer-profiles.component';
import { DetailedVolunteerProfileComponent } from './components/visitor/detailed-volunteer-profile/detailed-volunteer-profile.component';
import { DetailedVolunteerStatisticsComponent } from './components/visitor/detailed-volunteer-statistics/detailed-volunteer-statistics/detailed-volunteer-statistics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MakeAccusationComponent } from './components/visitor/make-accusation/make-accusation.component';
import { ReachedAccusationLimitationComponent } from './components/visitor/reached-accusation-limitation/reached-accusation-limitation.component';
import { VolunteersManagementComponent } from './components/admin/volunteers-management/volunteers-management.component';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { DonationComponent } from './components/visitor/donation/donation.component';
import { AccusationsManagementComponent } from './components/admin/accusations-management/accusations-management.component';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    VolunteerProfilesComponent,
    DetailedVolunteerProfileComponent,
    DetailedVolunteerStatisticsComponent,
    MakeAccusationComponent,
    ReachedAccusationLimitationComponent,
    VolunteersManagementComponent,
    DonationComponent,
    AccusationsManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgApexchartsModule,
    RippleModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    RadioButtonModule,
    DropdownModule, 
    CheckboxModule,
    FieldsetModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    StyleClassModule,
    ButtonModule,
    FloatLabelModule,
    ODataModule.forRoot({
      config: {
        serviceRootUrl: `${environment.apiBaseUrl}/odata/`
      }
    })
  ],
  providers: [ 
    AuthInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'en-US' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
