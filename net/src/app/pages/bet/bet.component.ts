import { Component } from "@angular/core";


@Component({
  templateUrl:"bet.template.html"
})
export class BetApp {
  
    public commonparts: Array<{ competition:string,hteamname: string, ateamname: string, resultcalchome: number, resultcalcaway: number, finalcalc: number, hlast: string, alast: string, marketGoals: string, hmiddle: string, hinfluent: string, ainfluent: string, amiddle: string, weather: string }> = [];
    //home
    hh1: any;
    hh2: any;
    hh3: any;
    hh4: any;
    hh5: any;

    //away
    aa1: any;
    aa2: any;
    aa3: any;
    aa4: any;
    aa5: any;


    constructor() {
        //home
        this.hh1 = 0;
        this.hh2 = 0;
        this.hh3 = 0;
        this.hh4 = 0;
        this.hh5 = 0;


        //away
        this.aa1 = 0;
        this.aa2 = 0;
        this.aa3 = 0;
        this.aa4 = 0;
        this.aa5 = 0;
        this.aa1 = 0;
    }


    public addrow(): void {
        this.commonparts.push({ competition:'',hteamname: '', ateamname: '', resultcalchome: 0, resultcalcaway: 0, finalcalc: 0, hlast: '', alast: '', marketGoals: 'overOneHT', hmiddle: 'notknow', hinfluent: 'notknow', ainfluent: 'notknow', amiddle: 'notknow', weather: 'notknow' });
    }

    calchome(i: any) {

        let arraysel: any = this.commonparts[i];

        let nGoalsHH = new Array();
        nGoalsHH.push(arraysel.hh1);
        nGoalsHH.push(arraysel.hh2);
        nGoalsHH.push(arraysel.hh3);
        nGoalsHH.push(arraysel.hh4);
        nGoalsHH.push(arraysel.hh5);


        arraysel.resultcalchome = this.uniteresults(i, nGoalsHH, arraysel.hlast, arraysel.hmiddle, arraysel.hinfluent, arraysel.hweather);

    }

    calcaway(i: any) {

        let nGoalsAA = new Array();
        let arraysel: any = this.commonparts[i];
        nGoalsAA.push(arraysel.aa1);
        nGoalsAA.push(arraysel.aa2);
        nGoalsAA.push(arraysel.aa3);
        nGoalsAA.push(arraysel.aa4);
        nGoalsAA.push(arraysel.aa5);

        arraysel.resultcalcaway = this.uniteresults(i, nGoalsAA, arraysel.alast, arraysel.amiddle, arraysel.ainfluent, arraysel.weather);

    }

    uniteresults(i: any, nGoalsHomeOut: Array<Number>, lastResult: string, middleWeek: string, influent: string, goodWeather: string): number {


        let percentageLast5GamesHomeOut: number = 60;
        let percentageGoalsLastResult: number = 10;
        let percentageMiddleWeek: number = 0;
        let percentageInfluentPlayer: number = 0;
        let percentageGoodWeather: number = 0;

        let overGoals = this.marketcalc(i);

        let numberLastResult: number = 0;

        let resultcalc = -1;

        if (lastResult === '') {
            alert('Must Introduce last result');

        } else {

            numberLastResult = Number(lastResult);
            let parameterLastResult: number = numberLastResult / overGoals * percentageGoalsLastResult;

            if (middleWeek == "no") {
                percentageMiddleWeek = 10;
            }
            else if (middleWeek == "notknow") {
                percentageLast5GamesHomeOut += 10;
            }


            if (influent == "yes") {
                percentageInfluentPlayer = 15;
            }
            else if (influent == "notknow") {
                percentageLast5GamesHomeOut += 15;
            }

            if (goodWeather == "yes") {
                percentageGoodWeather = 5;
            }
            else if (goodWeather == "notknow") {
                percentageLast5GamesHomeOut += 5;
            }

            let parameterLast5GamesHomeOut: number;

            parameterLast5GamesHomeOut = this.getParameter5Goals(nGoalsHomeOut, percentageLast5GamesHomeOut, overGoals);

            if (parameterLast5GamesHomeOut != -1) {

                resultcalc = parameterLast5GamesHomeOut + parameterLastResult + percentageMiddleWeek + percentageInfluentPlayer + percentageGoodWeather;
            }
        }


        return resultcalc;
    }



    getParameter5Goals(goals: any, percentageLast5Games: any, overGoals: any): number {

        let countGoals: number = 0;
        let parameterLast5Games: number = -1;
        let countnumbervalues: number = 0;

        for (var i = 0; i < goals.length; i++) {

            if (typeof goals[i] != "undefined") {
                countnumbervalues++;
                if (goals[i] > overGoals) {
                    countGoals++;
                }
            }
        }

        if (countnumbervalues === 0) {
            alert('Must Introduce value');
        }
        else {
            let mean: number = countGoals / countnumbervalues;
            parameterLast5Games = mean * percentageLast5Games;
        }

        return parameterLast5Games;
    }

    marketcalc(i: any): number {

        let arraysel: any = this.commonparts[i];

        let overGoals: number;

        if (arraysel.marketGoals == "overOneHT") {
            overGoals = 1.5;
        }
        else if (arraysel.marketGoals == "overTwoFT") {
            overGoals = 2.5;
        }
        else if (arraysel.marketGoals == "overThreeFT") {
            overGoals = 3.5;
        }
        return overGoals;
    }

    deleterow(i: any) {
        this.commonparts.splice(i, 1);
    }


    avgcalc(i: any) {

        let arraysel: any = this.commonparts[i];

        if (arraysel.resultcalchome === null || String(arraysel.resultcalchome) === 'undefined') {
            arraysel.resultcalchome = 0;
        }
        if (arraysel.resultcalcaway === null || String(arraysel.resultcalcaway) === 'undefined') {
            arraysel.resultcalcaway = 0;
        }

        arraysel.finalcalc = (arraysel.resultcalchome + arraysel.resultcalcaway) / 2;
    }

    exportdata() {


        for (var i = 0; i < this.commonparts.length; i++) {

            var data = [
                {
                    homeTeam: "Home Team Name: " + this.commonparts[i].hteamname,
                    nGoalsLast5Games: "N Goals Last 5 Games: " + this.commonparts[i],
                    nGoalsLastResult: "N Goals Last Result: " + this.commonparts[i].hlast,
                    middleWeek: "Had Game in middle of week: " + this.commonparts[i].hmiddle,
                    mostInfluentPlayer: "Most Inluent Player: " + this.commonparts[i].hinfluent
                },
                {
                    homeTeam: "Away Team Name: " + this.commonparts[i].ateamname,
                    nGoalsLast5Games: "N Goals Last 5 Games: " + this.commonparts[i],
                    nGoalsLastResult: "N Goals Last Result: " + this.commonparts[i].alast,
                    middleWeek: "Had Game in middle of week: " + this.commonparts[i].amiddle,
                    mostInfluentPlayer: "Most Inluent Player: " + this.commonparts[i].ainfluent
                },
                {
                    goalsMarket: "Goals Market: " + this.commonparts[i].ateamname,
                    goodWeather: "Is Good Weather: " + this.commonparts[i].ateamname,
                    calchome: "Calc Home: " + this.commonparts[i].ateamname,
                    calcaway: "Calc Away: " + this.commonparts[i].ateamname,
                    finalcalc: "Final Calc: " + this.commonparts[i].ateamname
                },
            ];
        }



        //new Angular2Csv(data, 'My Report');
    }

}

