import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SocialUser, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-bookmarks-tab',
  templateUrl: './bookmarks-tab.component.html',
  styleUrls: ['./bookmarks-tab.component.css']
})
export class BookmarksTabComponent implements OnInit {

  bookmark_list: any = [];
  keys_bookmarks = {};
  bookmarks_keys = {};

  user: SocialUser;


  /**
   * 
   * @param dataService 
   * This component populate the lilst of bookmarks of a particular user
   */


  constructor(private dataService:DataService,private authService:AuthService) { 
      
      this.getBookMarks();

      this.dataService.signedId.subscribe(()=>{
        this.getBookMarks();
      })

      this.dataService.signedOut.subscribe(()=>{
        this.user = null;
      });
  }

  ngOnInit() {
  }

  getBookMarks(){
    this.authService.authState.subscribe((user) => {
      this.user = user;        
      this.dataService.sendGetRequestBookMarksByUser(this.user.email).subscribe((response)=>{
        [this.bookmark_list,this.bookmarks_keys,this.keys_bookmarks] = this.dataService.processBookMarks(response);                  
     });
    });    
  }
  


}
