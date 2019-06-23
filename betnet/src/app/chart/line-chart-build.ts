import { GoalData } from './../model/goal-data';
import { Chart } from 'chart.js';




export class LineChartBuild {

  readonly yellowColor = 'rgb(255,255,0)';
  readonly blueColor = 'rgba(75,192,192,1)';
  readonly oliveColor = 'rgb(116,115,0)';
  readonly greenColor = 'rgb(116, 213, 0)';


  public createChart(goalData: GoalData, nativeElement, isHome, selectedTeam): Chart {

    return new Chart(nativeElement, {
      type: 'line',
      data: {
        labels: isHome ? goalData.labelsHome : goalData.labelsAway,
        datasets: [{
          label: selectedTeam,
          data: isHome ? goalData.scoredHome : goalData.scoredAway,
          fill: false,
          lineTension: 0,
          borderColor: this.blueColor,
        }, {
          label: 'Another teams',
          data: isHome ? goalData.sufferedHome : goalData.sufferedAway,
          fill: false,
          lineTension: 0,
          borderColor: this.oliveColor,
        },
        ],
      },
      options: {
        bezierCurve: false,
        tension: 0,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            min: 1,
            stepSize: 1,
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Number of goals'
            }
          }],
          xAxes: [{
            min: 1,
            stepSize: 1,
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Fixtures'
            }
          }]
        }
      }
    });
  }
}
