import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {

  repositoryData: any;
  score_number = [];

  constructor (
    public dialogRef: MatDialogRef<RepoDetailsComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any ) {
      console.log('data --> ', data);
    this.repositoryData = data;
    this.score_number = Array( this.repositoryData.score ).fill( 0 );
  }

  ngOnInit(): void { }

}
