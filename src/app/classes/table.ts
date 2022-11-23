export class Table {
  constructor(
    public group: any,
    public teams: Team[]
  ) {
  }
}

export class Team {
  constructor(
    public mp: any,
    public w: any,
    public l: any,
    public d: any,
    public pts: any,
    public gf: any,
    public ga: any,
    public gd: any,
    public name_en: any,
    public flag: any
  ) {
  }
}
