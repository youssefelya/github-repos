import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../constants/URLS';

@Injectable({
  providedIn: 'root'
})
export class ApiBackService {


  githubApi: string = URL.githubApi;
  constructor ( private http: HttpClient, ) { }


  // All repos by search query 
  getRepositories = ( searchQuery ) => {
      return fetch( this.githubApi + '/search/repositories?' + searchQuery )
          .then( response => {
              if ( response.ok ) {
                  return response;
              } else {
                  var error = new Error( 'Error ' + response.status + ': ' + response.statusText );
                  // @ts-ignore
                  error.response = response;
                  throw error;
              }
          },
              error => {
                  var errmess = new Error( error.message );
                  throw errmess;
              } )
          .then( response => response.json() )
          .then( res => res )
          .catch( error => console.log( "Error ! ", error ) );
  };



}
