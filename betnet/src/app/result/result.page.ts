import { Component, OnInit } from '@angular/core';
import { LaLigaTeamsService } from '../../service/LaLigaTeamsService';
import { RoundService } from '../../service/RoundService';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  templateUrl: 'result.page.html',
  styleUrls: ['result.page.scss'],
  providers: [LaLigaTeamsService, RoundService]
})
export class ResultPage {

  nGoalsHomeTeam;
  nGoalsAwayTeam;
  fileName: string = "tickets.json";
   path: string = null;
   downloadPath = null;
  
  fileTransfer: FileTransferObject = this.transfer.create();

  public teams: Array<{ team: string }> = [];
  public rounds: Array<{ round: number }> = [];

  public results: Array<{ nGoalsHomeTeam: number, nGoalsAwayTeam: number, hometeam: string, awayteam: string }> = [];

  constructor(private transfer: FileTransfer,private file:File,laLigaTeams: LaLigaTeamsService, roundService: RoundService, ) {
    this.teams = laLigaTeams.value;
    this.rounds = roundService.value;
    this.nGoalsAwayTeam = 0;
    this.nGoalsHomeTeam = 0;
  }



  addResult(): void {
    this.results.push({ nGoalsHomeTeam: 0, nGoalsAwayTeam: 0, hometeam: "", awayteam: "" });
  }


  saveTickets() {
    /*for (var i = 0; i < this.results.length; i++) {

      var data = [
        {
          nGoalsHomeTeam: "Home Team Name: " + this.results[i].hometeam,
          nGoalsAwayTeam: "N Goals Last 5 Games: " + this.results[i].awayteam,
          nGoalsLastResult: "N Goals Last Result: " + this.results[i].nGoalsHomeTeam,
          middleWeek: "Had Game in middle of week: " + this.results[i].nGoalsAwayTeam
        }

      ];
    }*/

    var fs = require("fs");
    var sampleObject = {
      a: 1,
      b: 2,
      c: {
          x: 11,
          y: 22
      }
  };
  
  fs.writeFile("./object.json", JSON.stringify(sampleObject, null, 4), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
  });

     //this.file.writeFile('src/assets/', this.fileName, JSON.stringify(data), { replace: false });
  }

  download() {
    this.path = this.file.dataDirectory + "files/";
    this.downloadPath = this.path + "beer.jpg";

    console.log(this.path);
    console.log("kfas");

    const url = 'http://www.example.com/file.pdf';
    var sampleObject = {
      a: 1,
      b: 2,
      c: {
          x: 11,
          y: 22
      }};

      this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
      this.file.writeFile("C:\Users\Alvaro\Documents\bet\betnet", "dasda", JSON.stringify(sampleObject), {replace:true})


    this.fileTransfer.download(JSON.stringify(sampleObject, null, 4),"lel" ).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });

   // return this.file.writeFile(this.file.dataDirectory, filename, JSON.stringify(object), {replace:true})

  }
  

}
