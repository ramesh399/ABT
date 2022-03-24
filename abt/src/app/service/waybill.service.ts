import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WaybillService {

  public API_URL = environment.API_URL;
  token: string;
  constructor(private http: HttpClient) { }

  private extractData1(res: any) {
    let body = res;
    return body || {};
  }
 
  private getToken(): string {
    if (!this.token) {
      this.token = 'dfa';
    }
    return this.token;
  }

  addPod(data): Observable<any> {
    return this.http.post<any>(this.API_URL + '/api/createbill/', data ,{ headers : { Authorization : `Bearer ${this.token}`}}).pipe(
      map(this.extractData1));
  }
}
