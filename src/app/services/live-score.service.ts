import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Live} from "../classes/live";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiveScoreService {
  live: Live | undefined;

  constructor(private http: HttpClient) {
  }

  public getLiveScore() {
    return new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(this.http.get<any>("https://projects.saturdev.tech/test/match/live")).then(
        (result) => {
          this.live = result;
          resolve();
        },
        (err) => {
          console.log(err);
          reject();
        }
      )
    })
  }
}
