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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
