import {Injectable} from '@angular/core';
import {Table} from "../classes/table";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StandingService {
  public tables: Table[]=[];

  constructor(private http: HttpClient) {
  }

  fetchTables() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdjOTY4MDQ4NzA5MjMzZmQ5NGViNGYiLCJpYXQiOjE2NjkxMDk0OTQsImV4cCI6MTY2OTE5NTg5NH0.X9l_m2ykjSqH__UBU-EkpTEP9oE9nDnGAwjOqzZPc8E')
    }
    return new Promise<void>((resolve, reject) => {
      this.http.get<any>('http://api.cup2022.ir/api/v1/standings', header).toPromise().then(
        (result) => {
          this.tables = result.data;
          console.log(this.tables);
          resolve()
        },
        (err) => {
          console.log(err);
          reject()
        }
      )
    })
  }


}
