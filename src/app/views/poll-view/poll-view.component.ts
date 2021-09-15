import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollInterface } from '@shared/Poll.interface';
import { FormBuilder, Validators } from '@angular/forms';

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
  selectedPoll: PollInterface = {
    title: 'Loading...',
    options: [
      {
        id: 1,
        content: 'Loading...',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  get email() {
    return this.pollForm.get('email');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedId = parseInt(params.get('id') ?? '-1');
    });
  }
}
