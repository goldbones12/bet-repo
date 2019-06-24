import { GoalData } from './../model/goal-data';
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

  goalData: GoalData = new GoalData;

  meanHomeScored: string;
  meanHomeSuffered: string;
  meanHomeCombined: string;

  meanAwayScored: string;
  meanAwaySuffered: string;
  meanAwayCombined: string;

  teams: Team[] = [];
  teamsLaLiga: Array<string>;
  teamsdata: Team[];
  selectedHomeTeam: string;
  selectedAwayTeam: string;

  @ViewChild('lineHomeCanvas') lineHomeCanvas;
  @ViewChild('lineAwayCanvas') lineAwayCanvas;

  numberOfGames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  nGames: number;

  lineChart: any;

  constructor(private laLigaService: LaLigaTeamsService, private teamDataFromFileService: TeamDataFromFileService) {
    this.teamsLaLiga = laLigaService.laligateams2018;
  }

  createChart(localOfGame: string) {

    this.teamsdata = this.teamDataFromFileService.teamsData;

    const isHome: boolean = 'home' === localOfGame;

    this.clearData(isHome);

    this.populateData(isHome);

    this.buildChart(isHome);

  }

  buildChart(isHome) {
    const selectedTeam = isHome ? this.selectedHomeTeam : this.selectedAwayTeam;

    const nativeElement = isHome ? this.lineHomeCanvas.nativeElement : this.lineAwayCanvas.nativeElement;

    this.lineChart = new LineChartBuild().createChart(this.goalData, nativeElement, isHome, selectedTeam);
  }

  populateData(isHome) {
    if (isHome) {
      this.populateHomeTeamData();
      this.clearMeanHomeValues();
    } else {
      this.populateAwayTeamData();
      this.clearMeanAwayValues();
    }

  }

  clearData(isHome: boolean) {


    if (isHome) {
      this.goalData.labelsHome = [];
      this.goalData.scoredHome = [];
      this.goalData.sufferedHome = [];

    } else {
      this.goalData.labelsAway = [];
      this.goalData.scoredAway = [];
      this.goalData.sufferedAway = [];
    }
  }

  populateHomeTeamData() {

    this.teamsdata.forEach(t => {
      if (t.$homeTeam === this.selectedHomeTeam) {
        this.goalData.labelsHome.push(t.$round);
        this.goalData.scoredHome.push(t.$resultHome);
        this.goalData.sufferedHome.push(t.$resultAway);
      }
    });

  }

  populateAwayTeamData() {
    this.teamsdata.forEach(t => {
      if (t.$awayTeam === this.selectedAwayTeam) {
        this.goalData.labelsAway.push(t.$round);
        this.goalData.sufferedAway.push(t.$resultHome);
        this.goalData.scoredAway.push(t.$resultAway);
      }
    });


  }


  meanHomeTeam(event) {

    const lastNumberOfGames = Number(event.target.value);

    const homeScoredByLastNOfGames = this.getNumberOfGoalsByNumberOfLastGames(lastNumberOfGames, this.goalData.scoredHome);
    const homeSufferByLastNOfGames = this.getNumberOfGoalsByNumberOfLastGames(lastNumberOfGames, this.goalData.sufferedHome);

    this.meanHomeScored = this.mean(homeScoredByLastNOfGames, lastNumberOfGames).toFixed(2);
    this.meanHomeSuffered = this.mean(homeSufferByLastNOfGames, lastNumberOfGames).toFixed(2);
    this.meanHomeCombined = this.meanCombined(homeScoredByLastNOfGames, homeSufferByLastNOfGames, lastNumberOfGames).toFixed(2);
  }

  meanAwayTeam(event) {

    const lastNumberOfGames = Number(event.target.value);

    const awayScoredByLastNOfGames = this.getNumberOfGoalsByNumberOfLastGames(lastNumberOfGames, this.goalData.scoredAway);
    const awaySufferByLastNOfGames = this.getNumberOfGoalsByNumberOfLastGames(lastNumberOfGames, this.goalData.sufferedAway);

    this.meanAwayScored = this.mean(awayScoredByLastNOfGames, lastNumberOfGames).toFixed(2);
    this.meanAwaySuffered = this.mean(awaySufferByLastNOfGames, lastNumberOfGames).toFixed(2);
    this.meanAwayCombined = this.meanCombined(awayScoredByLastNOfGames, awaySufferByLastNOfGames, lastNumberOfGames).toFixed(2);
  }

  clearMeanHomeValues() {
    this.meanHomeScored = '';
    this.meanHomeSuffered = '';
    this.meanHomeCombined = '';
  }

  clearMeanAwayValues() {
    this.meanAwayScored = '';
    this.meanAwaySuffered = '';
    this.meanAwayCombined = '';
  }


  getNumberOfGoalsByNumberOfLastGames(lastNumberOfGames: number, data) {

    const dataSliceByNumberOfGames = data.slice(Math.max(data.length - lastNumberOfGames));

    console.log('getNumberOfGoalsByNumberOfLastGames()', dataSliceByNumberOfGames);

    return dataSliceByNumberOfGames;
  }

  mean(data: Array<any>, lengthData: number) {
    let sum = 0;

    data.forEach(t => { sum += Number(t); });

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
