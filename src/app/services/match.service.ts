import {Injectable} from '@angular/core';
import {Match, Res} from "../classes/match";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  result: Object | undefined = [];
  matches: Match[] = []

  constructor(private http: HttpClient) {
  }

  public getMatches() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdjOTY4MDQ4NzA5MjMzZmQ5NGViNGYiLCJpYXQiOjE2NjkxMDk0OTQsImV4cCI6MTY2OTE5NTg5NH0.X9l_m2ykjSqH__UBU-EkpTEP9oE9nDnGAwjOqzZPc8E')
    }
    return  new Promise<void>((resolve, reject) => {
      this.http.get<Res>('http://api.cup2022.ir/api/v1/match', header).toPromise().then(
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
