import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PollViewComponent} from '@views/poll-view/poll-view.component';
import {AppRoutingModule} from '@app/modules/app-routing.module';
import {PageNotFoundComponent} from '@views/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@app/modules/material.module';
import {LogoComponent} from '@shared/components/logo/logo.component';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {StoreModule} from '@ngrx/store';
import * as fromPoll from '@store/poll/poll.reducer';
import {PollEffects} from '@store/poll/poll.effects';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PollViewComponent,
    PageNotFoundComponent,
    LogoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({
      poll: fromPoll.pollReducer,
    }),
    EffectsModule.forRoot([PollEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
