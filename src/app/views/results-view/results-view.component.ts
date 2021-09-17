import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { format, RouteUtils } from '@shared/RouteUtils';
import { Store } from '@ngrx/store';
import { PollState } from '@store/poll/poll.state';
import { GET_RESULTS } from '@store/poll/poll.actions';
import { UserData } from '@shared/models/UserData';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, Subscription } from 'rxjs';
import { IChartData } from '@shared/models/IChartData';
import { IResultsSummary } from '@shared/models/IResultsSummary';
import { selectResults } from '@store/poll/poll.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { IResult } from '@shared/models/IResult';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
})
export class ResultsViewComponent implements OnInit, OnDestroy {
  selectedId: number = 0;
  results$!: Observable<IResultsSummary>;
  resultsSub$!: Subscription;
  recaptcha$: Subscription | undefined;
  chartData: IChartData = { data: [], labels: [] };
  tableData: IResult[] = [];
  visibleColumns: string[] = ['option', 'count'];

  constructor(
    private pollStore: Store<PollState>,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.results$ = this.pollStore.select(selectResults);
    this.resultsSub$ = this.results$.subscribe((newResults) => {
      this.tableData = newResults.summary;
      this.chartData = {
        labels: newResults.summary.map((res) => res.content),
        data: newResults.summary.map((res) => res.count),
      };
    });
    this.recaptcha$ = this.reCaptchaV3Service
      .execute('poll_results_get')
      .subscribe((token) => {
        const userData: UserData = {
          username: '',
          userAgent: window.navigator.userAgent,
          recaptchaToken: token,
        };
        this.pollStore.dispatch({
          type: GET_RESULTS,
          pollId: this.selectedId,
          userData: userData,
        });
      });
  }

  ngOnDestroy() {
    this.resultsSub$.unsubscribe();
  }

  onSelectedIdChange(newId: number) {
    this.selectedId = newId;
  }

  get resultsUrl() {
    return (
      '/' +
      format(RouteUtils.POLL, {
        id: this.selectedId,
      })
    );
  }
}
