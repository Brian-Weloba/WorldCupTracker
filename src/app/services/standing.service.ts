import { Injectable } from '@angular/core';
import { Table } from "../classes/table";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StandingService {
  public tables: Table[] = [];

  constructor(private http: HttpClient) {
  }

  fetchTables() {
    return new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(this.http.get<any>('https://projects.saturdev.tech/worldcupapi/standings')).then(
        (result) => {
          this.tables = result;
          // console.log(this.tables);
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
