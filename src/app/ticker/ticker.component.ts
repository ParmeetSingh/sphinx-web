import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  ticker = []

  constructor(private dataService:DataService) {
      dataService.sendGetGRERequest().subscribe((data: any[])=>{
        let arr = []
        for(let key in data){
         arr.push(data[key]['word']);
        }
        arr.sort((a,b) => 0.5 - Math.random());
        this.ticker = arr.slice(0,25);      
      });
  }

  ngOnInit() {
  }

}
