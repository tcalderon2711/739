import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicAPIService {
  private apiURL='http://localhost:4000/api/generic-name';

  constructor(private http: HttpClient) { }

  getGenericNames(brandName:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.apiURL}?brand_name=${brandName}`);
  }
}
