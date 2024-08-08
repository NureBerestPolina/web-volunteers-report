import { Component } from '@angular/core';
import { UpsertAccusation } from '../../../models/dtos/upsert-accusation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationService } from '../../../services/common/accusation.service';
import { AuthService } from '../../../services/auth/auth.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-make-accusation',
  templateUrl: './make-accusation.component.html',
  styleUrl: './make-accusation.component.css'
})
export class MakeAccusationComponent {
  model: UpsertAccusation = {
    userId: '',
    volunteerId: '',
    reasonDescription: ''
  };

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly accusationService: AccusationService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const volunteerId = this.route.snapshot.paramMap.get('volunteerId');
    console.log('volunteerId', volunteerId);
    this.model.userId = this.authService.getUser()?.id || '';
    console.log('userId', this.model.userId);

    if (!volunteerId || this.model.userId == '') {
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.model.volunteerId = volunteerId;
  }

  onFormSubmit(): void {
    try{
      this.accusationService.create(this.model).subscribe({
        next: (response) => {
          console.log('Successful accusation creating!', this.model);
          this.router.navigate([
            '/volunteer-profiles',
          ]);
        },
        error: (error) => {
          this.router.navigate([
            '/reached-accusation-limit',
          ]);
        },
      });
    } catch (error) {
      console.error('error', error);
    } 
  }
}
