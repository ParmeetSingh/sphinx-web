import { Component, ViewChild, ElementRef, Renderer2, Output, OnInit } from '@angular/core';
import { DataService } from './data.service';
import {  Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { HttpClient } from '@angular/common/http';

import { AuthService, SocialUser } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'dictionary-ashuffleSubjpp';
  @Output('') searchEmit = new EventEmitter();
  
  user: SocialUser;
  loggedIn: boolean;
  
  constructor(private dataService: DataService,private http: HttpClient,
    private authService: AuthService,private cookieService: CookieService,private router:Router) {
      
  }

  ngOnChanges(){
    
  }

  ngOnInit(){


    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    
  }
  
  signIn(): void {
    this.dataService.signIn();    
  };

  signOut(): void {
    this.dataService.signOut();    
  }

  async searchResults(event){    
    this.router.navigate(['/results',event]);        
  }
  
  shuffle():any{
    let word = this.dataService.getRandomWord();    
    this.router.navigate(['/results',word]);
  }


  
}


