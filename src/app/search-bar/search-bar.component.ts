import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{


  public searchText:string;
  public sub:any;
  subscription:Subscription;
  @Output() searchEmit = new EventEmitter();
  myplaceHolder: string = 'Search'
  
  constructor(private dataService:DataService,private route: ActivatedRoute) { }



  myControl = new FormControl();
  local_options: string[];
  filteredOptions: string[];

  ngOnInit() {

    this.subscription = this.dataService.wordChanged
      .subscribe(
        (word: string) => {
          this.searchText = word;
        }
      )

    this.myControl.valueChanges.subscribe((value:string)=>{
      console.log(value);
      if(value!=null && value!==''){
        const filterValue = value.toLowerCase();
        this.dataService.sendGetRequestForList(filterValue).subscribe((data: any[])=>{
          let arr = []
          for(let key in data){
           arr.push(data[key]['word']);
          }
          console.log(this.filteredOptions);
          arr.sort(function(a,b){
                return a.split().length - b.split().length
          });
          this.filteredOptions = arr;
        });
    }
      
    });
      
      
  }

  callSomeFunction(option){
    this.searchText = option;
    console.log("call some function",this.searchText);
    this.searchEmit.emit(this.searchText);
  }

  checkPlaceHolder() {
    if (this.myplaceHolder) {
      this.myplaceHolder = null
      return;
    } else {
      this.myplaceHolder = 'Enter Name'
      return
    }
  }


}
