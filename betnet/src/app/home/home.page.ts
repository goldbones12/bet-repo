import { Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Team } from '../team/team';
import { LaLigaTeamsService } from '../../service/laliga-teams.service';
import { TeamDataFromFileService } from '../../service/team-data-from-file.service';


@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [LaLigaTeamsService, TeamDataFromFileService]
})

export class HomePage {

  teams: Team[] = [];
  teamsLaLiga: Array<{ team: string }>;
  teamsdata: Team[];
  selectedTeam: string;





  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineChart') lineChart;

  barChart: any;
  doughnutChart: any;

  constructor(private laLigaService: LaLigaTeamsService, private teamDataFromFileService: TeamDataFromFileService) {

    this.teamsLaLiga = laLigaService.laligateams2018;

  }


  selectTeam(team: any): void {
    this.createShartAtHome(team.detail.text);
  }

  createShartAtHome(team: string) {

    const dataGoalsHomeTeam = [];
    const labelsHomeTeam = [];

    const axisData: { x: string, y: string } = { x: '', y: '' };

    const axisDataArray: { x: string, y: string }[] = [];

    this.teamsdata = this.teamDataFromFileService.teamsData;


    this.teamsdata.forEach(t => {
      if (t.$homeTeam === team) {
        labelsHomeTeam.push(t.$date);
        dataGoalsHomeTeam.push(t.$resultHome);
        axisData.x = t.$date;
        axisData.y = t.$resultHome;
        axisDataArray.push(axisData);
      }
    });

    this.lineChart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: labelsHomeTeam,
        datasets: [{
          label: '# of Goals',
          data: dataGoalsHomeTeam,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}