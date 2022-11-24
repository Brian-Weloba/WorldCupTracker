import {Injectable} from '@angular/core';
import {Match} from "../classes/match";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  result: Object | undefined = [];
  matches: Match[] = []

  constructor(private http: HttpClient) {
  }

  public getMatches() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdjOTY4MDQ4NzA5MjMzZmQ5NGViNGYiLCJpYXQiOjE2NjkxMDk0OTQsImV4cCI6MTY2OTE5NTg5NH0.X9l_m2ykjSqH__UBU-EkpTEP9oE9nDnGAwjOqzZPc8E')
    };
    return  new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(this.http.get<any>('https://http-parse.herokuapp.com/match', header)).then(
        (result) => {

          this.matches = result?.data;
          // console.log(this.matches);
          resolve();
        },
        (err)=>{
          console.log(err)
          reject();
        }

      )
    })
  }


}
