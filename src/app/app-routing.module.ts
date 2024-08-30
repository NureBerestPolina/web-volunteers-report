import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { LoginComponent } from './components/public/login/login.component';
import { VolunteerProfilesComponent } from './components/visitor/volunteer-profiles/volunteer-profiles.component';
import { DetailedVolunteerProfileComponent } from './components/visitor/detailed-volunteer-profile/detailed-volunteer-profile.component';
import { DetailedVolunteerStatisticsComponent } from './components/visitor/detailed-volunteer-statistics/detailed-volunteer-statistics/detailed-volunteer-statistics.component';
import { MakeAccusationComponent } from './components/visitor/make-accusation/make-accusation.component';
import { ReachedAccusationLimitationComponent } from './components/visitor/reached-accusation-limitation/reached-accusation-limitation.component';
import { VolunteersManagementComponent } from './components/admin/volunteers-management/volunteers-management.component';
import { DonationComponent } from './components/visitor/donation/donation.component';
import { AccusationsManagementComponent } from './components/admin/accusations-management/accusations-management.component';
import { ReportCategoriesManagementComponent } from './components/admin/report-categories-management/report-categories-management.component';
import { AddReportCategoryComponent } from './components/admin/add-report-category/add-report-category.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reached-accusation-limit',
    component: ReachedAccusationLimitationComponent,
  },
  {
    path: 'volunteer-profiles',
    component: VolunteerProfilesComponent,
  },
  {
    path: 'donate/:id',
    component: DonationComponent,
  },
  {
    path: 'volunteer-profile/:id',
    component: DetailedVolunteerProfileComponent,
  },
  {
    path: 'accuse-volunteer/:volunteerId',
    component: MakeAccusationComponent,
  },
  {
    path: 'detailed-volunteer-statistics/:id',
    component: DetailedVolunteerStatisticsComponent,
  },
  {
    path: 'admin/volunteers-management',
    component: VolunteersManagementComponent,
  },
  {
    path: 'admin/accusations-management',
    component: AccusationsManagementComponent,
  },
  {
    path: 'admin/categories-management',
    component: ReportCategoriesManagementComponent,
  },
  {
    path: 'admin/add-category',
    component: AddReportCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
