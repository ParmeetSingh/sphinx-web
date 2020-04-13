import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {ActivatedRoute} from "@angular/router";
import { SocialUser, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})
export class ResultsViewComponent implements OnInit {

  results = [];
  word = "";
  bookmark_list: any = [];
  bookmarks_keys = {};
  keys_bookmarks = {};
  word_favorite = false;
  user: SocialUser;
  

  constructor(private dataService:DataService, private route: ActivatedRoute,
        private authService: AuthService) { 

          this.refreshResults();

          this.dataService.signedId.subscribe(()=>{
            this.refreshResults()
          });         

          this.dataService.signedOut.subscribe(()=>{
            this.bookmark_list = [];
            this.bookmarks_keys = {};
            this.keys_bookmarks = {};
            this.word_favorite = false;
            this.user = null;
          });
  }

  ngOnInit() {
    
  } 
  
  
  refreshResults(){

    this.route.paramMap.subscribe(params => {
      if(params.get('word') && params.get('word').trim()){        
      this.results = [];
      this.word = params.get('word');
    
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.dataService.addWordToUser(this.word,this.user.email);
        this.dataService.sendGetRequestBookMarksByUser(this.user.email).subscribe((response)=>{
          [this.bookmark_list,this.bookmarks_keys,this.keys_bookmarks] = this.dataService.processBookMarks(response);
          if(this.word in this.bookmarks_keys){
            this.word_favorite = true;
          }
          else{
            this.word_favorite = false;
          }                      
       });
  
      });   
    
      this.dataService.sendGetRequest(this.word).subscribe((data: any[])=>{
        this.results = data[Object.keys(data)[0]]["description"];                
      });      

    }
    });


    
  }

  updateFavoriteWord(){
    console.log("the new value is",this.word_favorite);
    if(this.user!==null){
      if(this.word in this.bookmarks_keys){
        console.log("removing word from bookmarks")
        this.dataService.removeBookmarks(this.bookmarks_keys[this.word]).subscribe((response)=>{
          this.word_favorite = false;
          this.refreshFavoriteWord();          
        });
      }else{
        console.log("addinng word to bookmarks")
        this.dataService.addWordToBookmarks(this.word,this.user.email).subscribe((response)=>{
          this.word_favorite = true;
          this.refreshFavoriteWord();
        });
      }      
    }    
    
  }

  refreshFavoriteWord(){
    this.dataService.sendGetRequestBookMarksByUser(this.user.email).subscribe((response)=>{
      [this.bookmark_list,this.bookmarks_keys,this.keys_bookmarks] = this.dataService.processBookMarks(response);
      console.log(this.keys_bookmarks);                  
    });
  }

}
