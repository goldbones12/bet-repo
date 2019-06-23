export class Team {
    private round: string;
    private homeTeam: string;
    private awayTeam: string;
    private resultHome: string;
    private resultAway: string;




    public constructor($round: string, $homeTeam: string, $awayTeam: string, $resultHome: string, $resultAway: string) {
        this.round = $round;
        this.homeTeam = $homeTeam;
        this.awayTeam = $awayTeam;
        this.resultHome = $resultHome;
        this.resultAway = $resultAway;
    }


    /**
     * Getter $round
     * @return {string}
     */
	public get $round(): string {
		return this.round;
	}

    /**
     * Setter $round
     * @param {string} value
     */
	public set $round(value: string) {
		this.round = value;
	}

    /**
     * Getter $awayTeam
     * @return {string}
     */
	public get $awayTeam(): string {
		return this.awayTeam;
	}

    /**
     * Setter $awayTeam
     * @param {string} value
     */
	public set $awayTeam(value: string) {
		this.awayTeam = value;
	}


    /**
     * Getter $homeTeam
     * @return {string}
     */
	public get $homeTeam(): string {
		return this.homeTeam;
	}

    /**
     * Setter $homeTeam
     * @param {string} value
     */
	public set $homeTeam(value: string) {
		this.homeTeam = value;
	}

    /**
     * Getter $resultAway
     * @return {string}
     */
	public get $resultAway(): string {
		return this.resultAway;
	}

    /**
     * Setter $resultAway
     * @param {string} value
     */
	public set $resultAway(value: string) {
		this.resultAway = value;
	}

    /**
     * Getter $resultHome
     * @return {string}
     */
	public get $resultHome(): string {
		return this.resultHome;
	}

    /**
     * Setter $resultHome
     * @param {string} value
     */
	public set $resultHome(value: string) {
		this.resultHome = value;
	}

}