import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { format, RouteUtils } from '../RouteUtils';
import { IPoll } from '../models/IPoll';
import { UserData } from '@shared/models/UserData';
import { IVoteRequest } from '@shared/models/IVoteRequest';
import { IVoteResponse } from '@shared/models/IVoteResponse';
import { IResultsSummary } from '@shared/models/IResultsSummary';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  getPoll(id: number, recaptchaToken: string) {
    return this.httpClient.get<IPoll>(
      format(environment.apiUrl + RouteUtils.POLL, {
        id: id,
      }),
      { headers: this.getHeaders(recaptchaToken) }
    );
  }

  addVote(optId: number, userData: UserData) {
    const voteRequest: IVoteRequest = {
      optionId: optId,
      userData: {
        username: userData.username,
        userAgent: userData.userAgent,
      },
    };
    const body = JSON.stringify(voteRequest);
    return this.httpClient.post<IVoteResponse>(
      environment.apiUrl + RouteUtils.POLL_VOTE,
      body,
      { headers: this.getHeaders(userData.recaptchaToken) }
    );
  }

  getResultsSummary(pollId: number, userData: UserData) {
    return this.httpClient.get<IResultsSummary>(
      format(environment.apiUrl + RouteUtils.POLL_RESULTS, {
        id: pollId,
      }),
      { headers: this.getHeaders(userData.recaptchaToken) }
    );
  }

  private getHeaders(recaptchaToken: string): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('g-recaptcha-response', recaptchaToken);
    return headers;
  }
}
