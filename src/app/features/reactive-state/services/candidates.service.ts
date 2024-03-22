import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  firstCall = true;

  constructor(private http: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private setLoadingStatus(status: boolean): void {
    this._loading$.next(status);
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  getCandidates(): void {
    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(1500), // Simulate a small delay
        tap((candidates) => {
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
          this.firstCall = false;
        })
      )
      .subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (this.firstCall) {
      this.getCandidates(); // Make sure we have the full list of candidates before showing details for an individual candidate
    }

    return this.candidates$.pipe(
      map(
        (candidates) => candidates.filter((candidate) => candidate.id === id)[0]
      )
    );
  }

  deleteCandidate(id: number | string) {
    this.setLoadingStatus(true);
    this.http
      .delete(`${environment.apiUrl}/candidates/${id}`)
      .pipe(
        delay(1000),
        switchMap(() => this.candidates$),
        take(1),
        map((candidates) =>
          candidates.filter((candidate) => candidate.id !== id)
        ),
        tap((candidates) => {
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  hireCandiate(id: number) {
    let company = 'Snapface Ltd';
    this.candidates$
      .pipe(
        take(1),
        map((candidates) =>
          candidates.map((candidate) =>
            candidate.id === id ? { ...candidate, company } : candidate
          )
        ),
        tap((updatedCandidates) => this._candidates$.next(updatedCandidates)),
        switchMap((updatedCandidates) =>
          this.http.patch(
            `${environment.apiUrl}/candidates/${id}`,
            updatedCandidates.find((candidate) => candidate.id === id)
          )
        )
      )
      .subscribe();
  }
}
