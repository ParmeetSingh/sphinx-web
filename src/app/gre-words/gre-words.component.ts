import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gre-words',
  templateUrl: './gre-words.component.html',
  styleUrls: ['./gre-words.component.css']
})
export class GreWordsComponent implements OnInit {

  config: any;  
  items = [];
  collection = {count: 1311, data: []};  
  ngOnInit() {          
  }

  
  
  constructor(private dataService:DataService) {

    //Create dummy data
    // for (var i = 0; i < this.collection.count; i++) {
    //   this.collection.data.push(
    //     {
    //       id: i + 1,
    //       value: "items number " + (i + 1)
    //     }
    //   );
    // }    

    this.dataService.getGREWords().subscribe(data => {
      const list = data.split('\n');
      let j = 0;
      list.forEach( e => {
        let word = e.split(',')[0];
        this.items.push(word);
        j = j + 1;          
      });      
      console.log(this.items);
      //this.items = Array(this.items.length-1).fill(0).map((x, i) => ({ id: (i + 1), name: this.items[i]["name"]}));
      
      for (var i = 0; i < this.collection.count; i++) {
        this.collection.data.push(
          {
            id: i + 1,
            value: this.items[i]
          }
        );
      }
      
    });        
  

    //console.log(this.collection.data);

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
