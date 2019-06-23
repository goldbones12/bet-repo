import { Chart } from 'chart.js';

export class LineChartBuild {


  public createChart(labels, scoredHomeTeamData, sufferedHomeTeamData, scoredAwayTeamData, sufferedAwayTeamData, nativeElement, homeTeam, awayTeam): Chart {
    return new Chart(nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: homeTeam + ' Goals',
          data: scoredHomeTeamData,
          fill: false,
          lineTension: 0,
          borderColor: 'rgba(75,192,192,1)',
        }, {
          label: 'Suffered goals home',
          data: sufferedHomeTeamData,
          fill: false,
          lineTension: 0,
          borderColor: 'rgb(255,255,0)',
        },
        {
          label: awayTeam + ' Goals',
          data: scoredAwayTeamData,
          fill: false,
          lineTension: 0,
          borderColor: 'rgba(75,192,192,1)',
        }, {
          label: 'Suffered goals home',
          data: sufferedAwayTeamData,
          fill: false,
          lineTension: 0,
          borderColor: 'rgb(128,128,0)',
        }],
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
