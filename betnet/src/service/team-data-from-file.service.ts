import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as papa from 'papaparse';
import { Team } from '../app/team/team';

@Injectable({
  providedIn: 'root',
})
export class TeamDataFromFileService {

  csvContent: string;
  parsedCsv: string[][];
  csvData: any[] = [];
  headerRow: any[] = [];
  teams: Team[] = [];
  teamsData: Team[];

  constructor(private http: Http) {
    this.loadTeamsFromFile();
  }


  loadTeamsFromFile(): Team[] {
    this.http.get('assets/laliga.csv')
      .subscribe(
        data => {
          this.teamsData = this.getTeamsFromFile(data);
        },
        error => {
          console.log(error);
        }
      );
      
      return this.teamsData;
  }

  public getTeamsFromFile(res): Team[] {
    const csvData = res['_body'] || '';
    const parsedData = papa.parse(csvData).data;

    for (let i = 0; i < parsedData.length; i++) {
      this.teams.push(new Team(parsedData[i][0],
        parsedData[i][1], parsedData[i][2], parsedData[i][3], parsedData[i][4]));
    }

    return this.teams;
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }


}
