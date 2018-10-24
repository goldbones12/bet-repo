export class RoundService {

    public rounds: Array<{ round: number }> = [
        { round: 1},
        { round: 2},
        { round: 3},
        { round: 4},
        { round: 5},
        { round: 6},
        { round: 7},
        { round: 8},
        { round: 9},
        { round: 10},
        { round: 11},
        { round: 12},
        { round: 13},
        { round: 14},
        { round: 15},
        { round: 16},
        { round: 17},
        { round: 18},
        { round: 19},
        { round: 20}
    ];


    
    public get value() : Array<{ round: number }> {
        return this.rounds;
    }
    

}