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

  teams: Team[] = [];
  teamsLaLiga: Array<string>;
  teamsdata: Team[];
  selectedHomeTeam: string;
  selectedAwayTeam: string;

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  constructor(private laLigaService: LaLigaTeamsService, private teamDataFromFileService: TeamDataFromFileService) {
    this.teamsLaLiga = laLigaService.laligateams2018;
  }

  createChart() {

    const dataGoalsHomeTeam = [];
    const labels = [];
    const dataGoalsAwayTeam = [];

    this.teamsdata = this.teamDataFromFileService.teamsData;

    this.teamsdata.forEach(t => {
      if (t.$homeTeam === this.selectedHomeTeam) {
        labels.push(t.$date);
        dataGoalsHomeTeam.push(t.$resultHome);
      }
      if (t.$awayTeam === this.selectedAwayTeam) {
        if (labels.length <= 0) {
          labels.push(t.$date);
        }
        dataGoalsAwayTeam.push(t.$resultAway);
      }

    });

    const lineChartBuild: LineChartBuild = new LineChartBuild();

    this.lineChart = lineChartBuild.createChart(labels, dataGoalsHomeTeam, dataGoalsAwayTeam, this.lineCanvas.nativeElement);
  }

}