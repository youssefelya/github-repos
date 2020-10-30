import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiBackService } from '../shared/services/api-back.service';
import * as CanvasJS from '../../assets/canvasjs.min';
@Component( {
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: [ './repo-details.component.css' ]
} )
export class RepoDetailsComponent implements OnInit {

  repositoryData: any;
  score_number = [];
  dataChartNotEmpty: boolean = false;
  dataChart = [];

  constructor (
    public dialogRef: MatDialogRef<RepoDetailsComponent>,
    private api: ApiBackService,
    @Inject( MAT_DIALOG_DATA ) public data: any ) {
    // console.log('data --> ', data);
    this.repositoryData = data;
  }

  ngOnInit (): void {
    this.getLanguage();
    this.score_number = Array( this.repositoryData.score ).fill( 0 );
  }

  getLanguage () {
    console.log( 'Repo --> ', this.repositoryData[ 'language' ] );
    this.dataChartNotEmpty = this.repositoryData[ 'language' ];
    if ( this.dataChartNotEmpty ) {
      this.api.getLanguagesByFullName( this.repositoryData.full_name ).then(
        res => {
          if ( res ) {
            //process the data, 
            for ( let key in res ) {
              let obj = { "y": res[ key ], "label": key, };
              this.dataChart.push( obj );
            }
            this.dataChartNotEmpty = this.dataChart.length != 0;
            this.createChart();
          }
          else {
            this.dataChartNotEmpty = false;
          }
        },
        err => {
          console.log( 'Error !!  ', err );
        }
      )
    }
  }


  createChart () {
    let chart = new CanvasJS.Chart( "chartContainer", {
      animationEnabled: true,
      title: {
        text: "Used languages"
      },
      //  exportEnabled: true,
      axisY: {
        title: 'Bytes of code',
      },
      height: 160,
      width: 280,
      data: [ {
        type: "bar",
        dataPoints: [
          ...this.dataChart
        ]
      } ]
    } );

    chart.render();
  }


}
