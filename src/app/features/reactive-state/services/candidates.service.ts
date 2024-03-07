import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _candidates = new BehaviorSubject<Candidate[]>([]);

  constructor(private http: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private setLoadingStatus(status: boolean): void {
    this._loading$.next(status);
  }

  get candidate$(): Observable<Candidate[]> {
    return this._candidates.asObservable();
  }

  getCandidates(): void {
    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1500), // Simulate a small delay
        tap((candidates) => {
          this._candidates.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }
}
