import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  wordChanged = new Subject<string>();
  searchWord = new Subject<string>();

  signedId = new Subject<any>();
  signedOut = new Subject<any>();


  private REST_API_SERVER = "http://localhost:3001/word";

  private REST_API_SERVER_LIST = "http://localhost:3001/words";

  private FIREBASE_SERVER = "https://dictionary-bea35.firebaseio.com/words.json";
  private FIREBASE_SERVER_USER_HISTORY = "https://dictionary-bea35.firebaseio.com/user_history.json";
  private FIREBASE_SERVER_USER_BOOKMARKS = "https://dictionary-bea35.firebaseio.com/user_bookmarks.json";
  word_list:any = []
  

  constructor(private httpClient: HttpClient,private authService:AuthService) { 
    this.httpClient.get('assets/words.txt', {responseType: 'json'})
          .subscribe(data => {this.word_list = data;});
    console.log("word list");
    
    

    

  }
  
  public signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (response) => {
        console.log("google logged in user data is= " , response);
        this.signedId.next();   
      }
    );
  }

  public signOut(){
    this.authService.signOut();
    console.log('User signed out.');
    this.signedOut.next();
  }

  public getRandomWord():string{
    let rw =  this.word_list[Math.floor(Math.random() * this.word_list.length)];
    console.log(rw);
    return rw;
  }

  public getWordWheelwords(str:string){
    const startsWithN = this.word_list.filter((word) => word.startsWith(str));
    console.log(startsWithN);
    return startsWithN;
  }

  public sendGetRequest(word:string){
    return this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&equalTo=\""+word+"\"");
  }
  public sendGetRequestHistoryByUser(user_email:string){
    return this.httpClient.get(this.FIREBASE_SERVER_USER_HISTORY+"?orderBy=\"user_email\"&equalTo=\""+user_email+"\"");    
  }

  public sendGetRequestBookMarksByUser(user_email:string){
    // return this.httpClient.get(this.REST_API_SERVER+"/"+word);
    return this.httpClient.get(this.FIREBASE_SERVER_USER_BOOKMARKS+"?orderBy=\"user_email\"&equalTo=\""+user_email+"\"");          
  }

  public processBookMarks(response){
    var jsonDataKeys = Object.keys(response);
    var jsonData = Object.values(response);
    console.log(jsonData);
    var keys_bookmarks = {}
    var bookmarks_keys = {}
    for (var i=0;i< jsonData.length;i++) {
        var counter:any = jsonData[i];
        var counter_key = jsonDataKeys[i];
        keys_bookmarks[counter_key] = counter.word;
        bookmarks_keys[counter.word] = counter_key;
    }
      console.log(keys_bookmarks);
      console.log(bookmarks_keys);

      let bkmark_list = []
      for(var key in bookmarks_keys) {
        bkmark_list.push(key);
      }

      return [bkmark_list,bookmarks_keys,keys_bookmarks];
  }

  public sendGetRequestForList(word:string){
    let response =  this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&limitToLast=10&startAt=\""+word+"\"&endAt=\""+word+"\uf8ff\"");
    console.log(response);
    return response;
  }

   formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = ((date.getMinutes() < 10)?"0":"") + date.getMinutes()
    var hour = ((date.getHours() < 10)?"0":"") + date.getHours()
    var ampm = ((date.getHours()>12)?('PM'):'AM');
  
    return day + ' ' + monthNames[monthIndex] + ',' + year + ' ' + hour +":"+minutes + " " +ampm;
  }
  
  public addWordToUser(word:string,user_email:string){
    let response =  this.httpClient.post(this.FIREBASE_SERVER_USER_HISTORY,{
      "word":word,
      "user_email":user_email,
      "date":this.formatDate(new Date())
    }).subscribe((response)=>{
      console.log(response);
    });
  }

  public addWordToBookmarks(word:string,user_email:string){
    return  this.httpClient.post(this.FIREBASE_SERVER_USER_BOOKMARKS,{
      "word":word,
      "user_email":user_email
    });
  }

  public removeBookmarks(word_key:string){
    return  this.httpClient.delete("https://dictionary-bea35.firebaseio.com/user_bookmarks"+"/"+word_key+".json");
  }

  public sendGetRequestForRandomString(word:string){
    // return this.httpClient.get(this.REST_API_SERVER+"/"+word);
    return this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&equalTo=\""+word+"\"");
  }

  public sendGetRequestForAll(){
    return this.httpClient.get(this.REST_API_SERVER_LIST);
  }
  public changeText(word:string): any{
    this.wordChanged.next(word);
  }
  public searchForWord(word:string): any{
    console.log("searched for word parmeet")
    this.searchWord.next(word);
  }
  
}