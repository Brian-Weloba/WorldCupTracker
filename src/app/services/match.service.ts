import { Injectable } from '@angular/core';
import { Match } from "../classes/match";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  result: Object | undefined = [];
  matches: Match[] = []

  constructor(private http: HttpClient) {
  }

  public getMatches() {
    return new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(this.http.get<any>('https://projects.saturdev.tech/worldcupapi/matches')).then(
        (result) => {
          this.matches = result;
          resolve();
        },
        (err) => {
          console.log(err)
          reject();
        }

      )
    })
  }


}
