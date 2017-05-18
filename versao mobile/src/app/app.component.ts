import { Component } from '@angular/core';

@Component({
    templateUrl: 'app.template.html'
})
export class BetApp {



    //home
    hh1: any;
    hh2: any;
    hh3: any;
    hh4: any;
    hh5: any;
    ho1: any;
    ho2: any;
    ho3: any;
    ho4: any;
    ho5: any;
    hlast: any;
    hmiddle: string;
    hinfluent: string;
    hweather: string;
    resultcalchome: number;

    //away
    aa1: any;
    aa2: any;
    aa3: any;
    aa4: any;
    aa5: any;
    ao1: any;
    ao2: any;
    ao3: any;
    ao4: any;
    ao5: any;
    alast: any;
    ainfluent: any;
    aweather: any;
    amiddle: string;
    resultcalcaway: number;

    resultcalc: number;
    finalcalc: any;

    //market
    marketGoals: string = "overOneHT";


    constructor() {

        //home
        this.hh1 = 0;
        this.hh2 = 0;
        this.hh3 = 0;
        this.hh4 = 0;
        this.hh5 = 0;
        this.ho1 = 0;
        this.ho2 = 0;
        this.ho3 = 0;
        this.ho4 = 0;
        this.ho5 = 0;
        this.hlast = 0;
        this.hmiddle = 'notknow';
        this.hinfluent = 'notknow';
        this.hweather = 'notknow';

        //away
        this.aa1 = 0;
        this.aa2 = 0;
        this.aa3 = 0;
        this.aa4 = 0;
        this.aa5 = 0;
        this.aa1 = 0;
        this.ao2 = 0;
        this.ao3 = 0;
        this.ao4 = 0;
        this.ao5 = 0;
        this.alast = 0;
        this.amiddle = 'notknow';
        this.ainfluent = 'notknow';
        this.aweather = 'notknow';

        //final calc
        this.finalcalc = 0;
    }

    calchome() {

        let nGoalsHH = new Array();
        nGoalsHH.push(this.hh1);
        nGoalsHH.push(this.hh2);
        nGoalsHH.push(this.hh3);
        nGoalsHH.push(this.hh4);
        nGoalsHH.push(this.hh5);

        let nGoalsHO = new Array();
        nGoalsHO.push(this.ho1);
        nGoalsHO.push(this.ho2);
        nGoalsHO.push(this.ho3);
        nGoalsHO.push(this.ho4);
        nGoalsHO.push(this.ho5);

        this.resultcalchome = this.uniteresults(nGoalsHH, nGoalsHO, this.hlast, this.hmiddle, this.hinfluent, this.hweather);

    }

    calcaway() {

        let nGoalsAA = new Array();
        nGoalsAA.push(this.aa1);
        nGoalsAA.push(this.aa2);
        nGoalsAA.push(this.aa3);
        nGoalsAA.push(this.aa4);
        nGoalsAA.push(this.aa5);

        let nGoalsAO = new Array();
        nGoalsAO.push(this.ao1);
        nGoalsAO.push(this.ao2);
        nGoalsAO.push(this.ao3);
        nGoalsAO.push(this.ao4);
        nGoalsAO.push(this.ao5);

        this.resultcalcaway = this.uniteresults(nGoalsAA, nGoalsAO, this.alast, this.amiddle, this.ainfluent, this.aweather);

    }

    uniteresults(nGoalsHomeOut: Array<Number>, nGoalsOverall: Array<Number>, lastResult: number, middleWeek: string, influent: string, goodWeather: string): number {


        let percentageLast5Games: number = 30;
        let percentageLast5GamesHomeOut: number = 30;
        let percentageGoalsLastResult: number = 10;
        let percentageMiddleWeek: number = 0;
        let percentageInfluentPlayer: number = 0;
        let percentageGoodWeather: number = 0;

        let overGoals = this.marketcalc();


        if (middleWeek == "no") {
            percentageMiddleWeek = 10;
        }
        else if (middleWeek == "notknow") {
            percentageLast5GamesHomeOut = 35;
            percentageLast5Games = 35;
        }


        if (influent == "yes") {
            percentageInfluentPlayer = 15;
        }
        else if (influent == "notknow") {
            percentageLast5GamesHomeOut = 37.5;
            percentageLast5Games = 37.5;
        }

        if (goodWeather == "yes") {
            percentageGoodWeather = 5;
        }
        else if (goodWeather == "notknow") {
            percentageLast5GamesHomeOut = 32.5;
            percentageLast5Games = 32.5;
        }


        let parameterLast5GamesHomeOut: number = this.getParameter5Goals(nGoalsHomeOut, percentageLast5GamesHomeOut, overGoals);
        let parameterLast5GamesOverall: number = this.getParameter5Goals(nGoalsOverall, percentageLast5Games, overGoals);
        let parameterLastResult: number = lastResult / overGoals * percentageGoalsLastResult;


        return this.resultcalc = parameterLast5GamesOverall + parameterLast5GamesHomeOut + parameterLastResult + percentageMiddleWeek + percentageInfluentPlayer + percentageGoodWeather;
    }



    getParameter5Goals(goals: any, percentageLast5Games: any, overGoals: any): number {

        let countGoals: number = 0;

        for (var i = 0; i < goals.length; i++) {
            if (goals[i] > overGoals) {
                countGoals++;
            }
        }

        let mean: number = countGoals / 5.0;

        let parameterLast5Games: number = mean * percentageLast5Games;

        return parameterLast5Games;
    }

    marketcalc(): number {


        let overGoals: number;

        if (this.marketGoals == "overOneHT") {
            overGoals = 1.5;
        }
        else if (this.marketGoals == "overTwoFT") {
            overGoals = 2.5;
        }
        else if (this.marketGoals == "overThreeFT") {
            overGoals = 3.5;
        }
        return overGoals;
    }


    avgcalc() {

        if (this.resultcalchome === null || String(this.resultcalchome) === 'undefined') {
            this.resultcalchome = 0;
        }
        if (this.resultcalcaway === null || String(this.resultcalcaway) === 'undefined') {
            this.resultcalcaway = 0;
        }

        this.finalcalc = (this.resultcalchome + this.resultcalcaway) / 2;
    }

}
