import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {RepoDetailsComponent} from './repo-details/repo-details.component';
import {Response} from '../assets/dataSet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'github-repo';
  repos=[];
  constructor(private spinner : NgxSpinnerService
              ,private dialog: MatDialog
    ){
    this.repos=Array(30).fill(Response);
  }

  onScroll () {
    this.spinner.show();    
  }

  openDialog ( repo ): void {
    const dialogRef = this.dialog.open( RepoDetailsComponent, {
      width: '80%',
      height:'70%',
      data: repo,
    } );
  }


}
