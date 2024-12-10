import { Component,OnInit } from '@angular/core';
import { PrescriptionService } from '../shared/prescription.service';
import { IRx } from '../models/IRx';
@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.scss'
})
export class PrescriptionsComponent implements OnInit{
 public rxList:IRx[]=[];

 constructor(private prescriptionService:PrescriptionService){}

 ngOnInit() {
  this.prescriptionService.rxList$.subscribe((data)=>{
      this.rxList=data;
    });

    this.prescriptionService.getRXList().subscribe();


 }
}
