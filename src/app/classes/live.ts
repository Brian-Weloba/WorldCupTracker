export class Venue {
  constructor(
    public city: any,
    public staduim: any,
    public capacity: any
  ) {
  }
}

export class Team {
  constructor(
    public home: Home,
    public away: Away
  ) {
  }
}

export class Home {
  constructor(
    public name: any,
    public code: any
  ) {
  }
}


export class Away {
  constructor(
    public name: any,
    public code: any
  ) {
  }
}


export class Referee {
  constructor(
    public name: any,
    public country: any
  ) {
  }
}

export class Time {
  constructor(
    public period: any,
    public start: any
  ) {
  }
}

export class Score {
  constructor(
    public home: any,
    public away: any
  ) {
  }
}

export class Status {

  constructor(
    public description: any,
    public code: any
  ) {
  }
}

export class LiveMatch {
  constructor(
    public tournament: any,
    public venue: Venue,
    public teams: Team,
    public referee: Referee,
    public status: Status,
    public score: Score,
    public time: Time
  ) {
  }
}

export class Live {

  constructor(
    public time: any,
    public match: LiveMatch
  ) {
  }
}
