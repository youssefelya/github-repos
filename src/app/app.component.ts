import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'github-repo';
  repos=[];
  testObject = {
    full_name:'Youssef ELYA',
    name:'Youssef',
    owner:{
      login:'Login',
      avatar_url:'https://avatars.githubusercontent.com/u/583231?v=3',
    }
  }
  constructor(){
    this.repos=Array(30).fill(this.testObject);
  }
}
