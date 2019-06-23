import { Component, ViewChild } from '@angular/core';
import { LaLigaTeamsService } from '../../service/laliga-teams.service';
import { TeamDataFromFileService } from '../../service/team-data-from-file.service';
import { LineChartBuild } from '../chart/line-chart-build';
import { Team } from '../team/team';



@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [LaLigaTeamsService, TeamDataFromFileService]
})

export class HomePage {

  meanHomeLast5: number;
  meanHomeOverall: number;
  meanHomeLast5Combined: number;
  meanHomeOverallCombined: number;

  meanAwayLast5: number;
  meanAwayOverall: number;
  meanAwayLast5Combined: number;
  meanAwayOverallCombined: number;

  teams: Team[] = [];
  teamsLaLiga: Array<string>;
  teamsdata: Team[];
  selectedHomeTeam: string;
  selectedAwayTeam: string;

  @ViewChild('lineHomeCanvas') lineHomeCanvas;
  @ViewChild('lineAwayCanvas') lineAwayCanvas;

  lineChart: any;

  constructor(private laLigaService: LaLigaTeamsService, private teamDataFromFileService: TeamDataFromFileService) {
    this.teamsLaLiga = laLigaService.laligateams2018;
  }




  createChart() {
    const dataGoalsSelectedTeam = [];
    const dataGoalsAnotherTeam = [];
    const dataGoalsScoredAwayTeam = [];
    const dataGoalsSufferedAwayTeam = [];

    let sumLast5GamesHome = 0;

    const labels = [];

    this.teamsdata = this.teamDataFromFileService.teamsData;

    this.teamsdata.forEach(t => {
      if (t.$homeTeam === this.selectedHomeTeam) {
        labels.push(t.$round);
        dataGoalsSelectedTeam.push(t.$resultHome);
        dataGoalsAnotherTeam.push(t.$resultAway);
      }

      if (t.$awayTeam === this.selectedAwayTeam) {
        labels.push(t.$round);
        dataGoalsScoredAwayTeam.push(t.$resultAway);
        dataGoalsSufferedAwayTeam.push(t.$resultHome);
      }
    });




    this.meanHomeLast5 = this.mean(dataGoalsSelectedTeam.slice(Math.max(dataGoalsSelectedTeam.length - 5)), 5);
    this.meanHomeOverall = this.mean(dataGoalsSelectedTeam, dataGoalsSelectedTeam.length);
    this.meanHomeLast5Combined = this.meanCombined(dataGoalsSelectedTeam.slice(Math.max(dataGoalsSelectedTeam.length - 5)), dataGoalsAnotherTeam.slice(Math.max(dataGoalsAnotherTeam.length - 5)),
      dataGoalsAnotherTeam.length);
    this.meanHomeOverallCombined = this.meanCombined(dataGoalsSelectedTeam, dataGoalsAnotherTeam, dataGoalsSelectedTeam.length * 2);


    this.meanAwayLast5 = this.mean(dataGoalsSelectedTeam.slice(Math.max(dataGoalsSelectedTeam.length - 5)), 5);
    this.meanAwayOverall = this.mean(dataGoalsSelectedTeam, dataGoalsSelectedTeam.length);
    this.meanAwayLast5Combined = this.meanCombined(dataGoalsSelectedTeam.slice(Math.max(dataGoalsSelectedTeam.length - 5)), dataGoalsAnotherTeam.slice(Math.max(dataGoalsAnotherTeam.length - 5)),
      dataGoalsAnotherTeam.length);
    this.meanAwayOverallCombined = this.meanCombined(dataGoalsSelectedTeam, dataGoalsAnotherTeam, dataGoalsSelectedTeam.length * 2);



    const lineChartBuild: LineChartBuild = new LineChartBuild();


    this.lineChart = lineChartBuild.createChart(labels, dataGoalsSelectedTeam,
       dataGoalsAnotherTeam, dataGoalsScoredAwayTeam, dataGoalsSufferedAwayTeam,
        this.lineHomeCanvas.nativeElement, this.selectedHomeTeam, this.selectedAwayTeam);
  }

  mean(data: Array<any>, lengthData: number) {
    let sum = 0;

    data.forEach(t => {
      sum += Number(t)
        ;
    });

    return sum / lengthData;
  }


  meanCombined(dataSelected: Array<any>, dataOther: Array<any>, lengthData: number) {
    let sumSelected = 0;
    let sumOther = 0;

    dataSelected.forEach(t => {
      sumSelected += Number(t)
        ;
    });

    dataOther.forEach(t => {
      sumOther += Number(t)
        ;
    });

    return (sumSelected + sumOther) / lengthData;
  }

}
