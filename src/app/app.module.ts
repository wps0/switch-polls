import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PollViewComponent } from '@views/poll-view/poll-view.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { PageNotFoundComponent } from '@views/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material.module';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import * as fromPoll from '@store/poll/poll.reducer';
import { PollEffects } from '@store/poll/poll.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AudioPlayerComponent } from '@shared/components/audio-player/audio-player.component';
import { ExtractExtraFromPollOptionPipe } from '@shared/pipes/extract-extra.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { ToMinuteStringPipe } from '@shared/pipes/to-minute-string.pipe';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaModule,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { environment } from '@environments/environment';
import { ResultsViewComponent } from './views/results-view/results-view.component';
import { PollViewRootComponent } from './views/poll-view-root/poll-view-root.component';

@NgModule({
  declarations: [
    AppComponent,
    PollViewComponent,
    PageNotFoundComponent,
    LogoComponent,
    FooterComponent,
    AudioPlayerComponent,
    ExtractExtraFromPollOptionPipe,
    ToMinuteStringPipe,
    ResultsViewComponent,
    PollViewRootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RecaptchaV3Module,
    StoreModule.forRoot({
      poll: fromPoll.pollReducer,
    }),
    EffectsModule.forRoot([PollEffects]),
    MatSliderModule,
    RecaptchaModule,
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
