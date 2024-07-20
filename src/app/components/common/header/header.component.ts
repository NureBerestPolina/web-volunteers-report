import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/auth/user.model';
import { Role } from '../../../models/auth/roles.enum';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  user?: User;
  role = Role;

  userSubscription$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.authService.user().subscribe({
      next: (user) => {
        this.user = user;

        if (this.user?.avatarUrl === '') {
          this.user.avatarUrl = 'assets/blank-avatar.png';
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$?.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}