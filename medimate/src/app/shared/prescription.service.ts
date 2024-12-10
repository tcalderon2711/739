import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { IRx } from '../models/IRx';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiURL='http://localhost:3000';

  private httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Accept' :'application/json'
    })
    };

    private rxListSubject=new BehaviorSubject<IRx[]>([]);
    public rxList$=this.rxListSubject.asObservable();
  constructor(private httpClient:HttpClient){}

 

  getRXList():Observable<IRx[]>{
    return this.httpClient.get<IRx[]>(this.apiURL,this.httpOptions).pipe(
      tap((data)=>this.rxListSubject.next(data))
    );
  }

  addRX(rx:IRx):Observable<IRx>{
    return this.httpClient.post<IRx>(this.apiURL,rx,this.httpOptions).pipe(
      tap(()=> this.refreshRXList())
    );
  }

  updateRX(name:string, updatedRx:IRx):Observable<IRx>{
    return this.httpClient.put<IRx>(`${this.apiURL}/${name}`,updatedRx,this.httpOptions).pipe(
    tap(()=>this.refreshRXList())
  );
  }

  deleteRx(name:string):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiURL}/${name}`,this.httpOptions).pipe(
      tap(()=>this.refreshRXList())
    );
  }

  private refreshRXList():void{
    this.getRXList().subscribe();
  }
}
