export class LaLigaTeamsService {

    public laligateams2018: Array<{ team: string }> = [
        { team: 'Alavés' },
        { team: 'Athletic Bilbao' },
        { team: 'Atlético Madrid' },
        { team: 'Barcelona' },
        { team: 'Celta Vigo' },
        { team: 'Eibar' },
        { team: 'Espanyol' },
        { team: 'Getafe' },
        { team: 'Girona' },
        { team: 'Huesca' },
        { team: 'Leganés' },
        { team: 'Levante' },
        { team: 'Rayo Vallecano' },
        { team: 'Real Betis' },
        { team: 'Real Madrid' },
        { team: 'Real Sociedad' },
        { team: 'Sevilla' },
        { team: 'Valencia' },
        { team: 'Valladolid' },
        { team: 'Villarreal' }
    ];


    
    public get value() : Array<{ team: string }> {
        return this.laligateams2018;
    }
    

}