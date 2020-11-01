import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {RepoDetailsComponent} from './repo-details/repo-details.component';
import {Response} from '../assets/dataSet';
import {ApiBackService} from './shared/services/api-back.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'github-repo';
  repositoriesData =[];
  incomplete_results : boolean = false;
  currentPage:number =1;
  date: string;

  constructor(private spinner : NgxSpinnerService,
              private dialog: MatDialog,
              private api: ApiBackService,
    ){
  }
  ngOnInit () {
    this.dateFormate();
    this.loadInitPost();
  }


  onScroll () {
    if ( !this.incomplete_results ) {
      this.spinner.show();
      /*
       check --> https://developer.github.com/v3/search/
      10 requests per minute for unauthenticated requests as ours! 
      To avoid rate limit send request every 6,001 second. 
      */
      setTimeout( () => this.loadInitPost(), 6001 );
    }
  }

  openDialog ( repo ): void {
    const dialogRef = this.dialog.open( RepoDetailsComponent, {
      width: '80%',
      height:'70%',
      data: repo,
    } );
  }

  

  loadInitPost () {
    const searchQuery = 'q=created:>' + this.date + '&sort=stars&order=desc&page=' + this.currentPage;
    this.api.getRepositories( searchQuery ).then(
      res => {
        //check if this is the last page.
        this.incomplete_results = res[ 'incomplete_results' ];
        this.repositoriesData = [ ...this.repositoriesData, ...res[ 'items' ] ];
        this.currentPage++;
        this.spinner.hide();
      },
      err => {
        if ( err.status === 403 ) {
          console.log( 'Rate Limit error !! ', err )
        }
        else {
          console.log( 'Error !!  ', err );
        }
        this.spinner.hide();
      }
    );
    
  }

  dateFormate () {
    let datePipe = new DatePipe( "en-US" );
    let d = new Date();
    //At the beginning we had -1, but we received nothing in the mid nights (00:00)
    d.setDate( d.getDate() - 2 );
    this.date = datePipe.transform( d, 'yyyy-MM-dd' );
  }



}
