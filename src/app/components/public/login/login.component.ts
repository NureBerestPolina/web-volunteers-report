import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../../models/dtos/login-request.model';
import { Role } from '../../../models/auth/roles.enum';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    window.onGoogleSignIn = this.onGoogleSignIn.bind(this);

  }

  onGoogleSignIn(response: any): void {
    debugger;
    this.authService.login({ googleOAuthJwt: response.credential }).subscribe({
      next: ({ token, refreshToken }) => {
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveRefreshToken(refreshToken);

        const user = this.tokenStorage.getUser();
        if (user) {
          this.authService.setUser(user);
        }
        this.router.navigateByUrl('/');
      },
    });
  }
}

declare global {
  interface Window {
    onGoogleSignIn: (response: any) => void;
  }
}