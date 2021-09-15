import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PollViewComponent } from '@views/poll-view/poll-view.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { PageNotFoundComponent } from '@views/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material.module';
import { LogoComponent } from './shared/components/logo/logo.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
