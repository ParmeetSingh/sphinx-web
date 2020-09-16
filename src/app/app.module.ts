import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PosPipe } from './search-bar/custom-pipe';
import { SynonymPipe } from './search-bar/custom-pipe-filter-word';
import { RouterModule } from '@angular/router';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from "ngx-cookie-service";
import { HistoryTabComponent } from './history-tab/history-tab.component';
import { BookmarksTabComponent } from './bookmarks-tab/bookmarks-tab.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { NgMarqueeModule } from 'ng-marquee';
import { TickerComponent } from './ticker/ticker.component';
import { GreWordsComponent } from './gre-words/gre-words.component';
import { NgxPaginationModule } from 'ngx-pagination';
 
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("80482800130-hvt5t1joifqnksbdc880hsjfn0ad6ga6.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}
 

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PosPipe,
    SynonymPipe,
    HistoryTabComponent,
    BookmarksTabComponent,
    ResultsViewComponent,
    DefaultPageComponent,
    TickerComponent,
    GreWordsComponent
  ],
  imports: [
    NgMarqueeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: "default", component: DefaultPageComponent},
      {
        path: '',
        redirectTo: "default",
        pathMatch: 'full'
      },
      { path: "history", component: HistoryTabComponent },
      { path: "bookmarks", component: BookmarksTabComponent },
      { path: "gre-words", component: GreWordsComponent },
      { path: "results/:word", component: ResultsViewComponent },
      { path: '**', component: DefaultPageComponent }      
    ])
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
