import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CandidatesService } from '../../services/candidates.service';
import {
  Observable,
  catchError,
  filter,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  candidate$!: Observable<Candidate>;
  loading$!: Observable<boolean>;

  constructor(
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.candidate$ = this.candidatesService.getCandidateById(1);
    this.initObservables();
  }

  initObservables(): void {
    this.candidate$ = this.route.params.pipe(
      map((params) => +params['id']),
      filter((id) => id !== undefined),
      switchMap((id) => this.candidatesService.getCandidateById(id))
    );

    this.loading$ = this.candidatesService.loading$;
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }

  onHire() {
    throw new Error('Method not implemented.');
  }

  onRefuse() {
    this.candidate$
      .pipe(
        take(1),
        tap((candidate) => {
          this.candidatesService.deleteCandidate(candidate.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }
}
