import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPoll} from '@shared/models/IPoll';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {PollState} from '@store/poll/poll.state';
import {Store} from '@ngrx/store';
import {selectPoll} from '@store/poll/poll.selectors';
import {GET_POLL,} from '@store/poll/poll.actions';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss'],
})
export class PollViewComponent implements OnInit {
  pollForm = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      },
    ],

    option: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });
  selectedId: number = -1;
  selectedPoll$: Observable<IPoll> = of();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pollStore: Store<PollState>
  ) {}

  ngOnInit(): void {
    this.selectedPoll$ = this.pollStore.select(selectPoll);
    this.activatedRoute.paramMap.subscribe((params) => {
      let newId = parseInt(params.get('id') ?? '-1');
      if (newId !== this.selectedId) {
        this.selectedId = newId;
        this.pollStore.dispatch({
          type: GET_POLL,
          pollId: this.selectedId,
        });
      }
    });
  }

  get email() {
    return this.pollForm.get('email');
  }
}
