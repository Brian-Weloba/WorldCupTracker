export class Match {

  constructor(
    public away_score: any,
    public group: any,
    public finished: any,
    public home_score: any,
    public local_date: any,
    public time_elapsed: any,
    public type: any,
    public home_team_en: any,
    public away_team_en: any,
    public home_flag: any,
    public away_flag: any,
    public matchday: any,
    public away_scorers: String,
    public home_scorers: String,
  ) {
  }
}

export class Res {
  constructor(
    public data: any
  ) {
  }
}

