import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.css']
})
export class HistoryTabComponent implements OnInit {

  user_history=[];
  user: SocialUser;
  
  constructor(private dataService:DataService,private authService:AuthService) {     
  }

  ngOnInit() {

      this.loadHistory();        
      
      this.dataService.signedId.subscribe(()=>{
        this.loadHistory();
      })

      this.dataService.signedOut.subscribe(()=>{
        this.user = null;
      });
    
    
  }

  loadHistory(){

    this.authService.authState.subscribe((user) => {
      this.user = user;              
      this.dataService.sendGetRequestHistoryByUser(this.user.email).subscribe((response)=>{
        console.log(response);
        let usr_history = []
        var jsonData = Object.values(response);
        for (var key in jsonData) {
          var counter = jsonData[key];
          usr_history.push([counter.date,counter.word]);
        }
        this.user_history = usr_history;
        console.log(this.user_history);
      });
    });

    
  }

  

}
