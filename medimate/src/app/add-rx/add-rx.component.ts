import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PrescriptionService } from '../shared/prescription.service';
import { NgForm } from '@angular/forms';
import {IRx} from '../models/IRx';

@Component({
  selector: 'app-add-rx',
  templateUrl: './add-rx.component.html',
  styleUrl: './add-rx.component.scss'
})
export class AddRxComponent implements OnInit{

  public saveUnsuccessful = false;

  public name:string;

  public dose:number;

  public unit:string;

  public frequency:string;

  public rxList:IRx[]=[];
  constructor(private prescriptionService:PrescriptionService){

  }
  //fill out the table when starting application 
  ngOnInit(){
    this.getData();
  }
  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;

    if (!ngForm.valid) {
      this.saveUnsuccessful = true;    //if it was not successfully submited, returns nothing
      return;
    }
    console.log(ngForm);

    // //creating the header
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    // };

    //creating the data
    const data:IRx= {
      name:this.name,
      dose: this.dose,
      unit: this.unit,
      frequency:this.frequency
    };

    //post the data to specified url
    this.prescriptionService.addRX(data).subscribe({
        next: () => {
          console.log("call successful");
          this.rxList.push(data);
        },
        error: (err) => {
          console.error("Error occurred: " + err);
        }
      });


    ngForm.resetForm();
  }
//gets data to fill out table 
  getData() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    // };

    this.prescriptionService.getRXList()
      .subscribe({
        next: (data) => {
          this.rxList=data;
        },
        error: (err) => {
          console.log("eror occurred: " + err);
        }
      });
  }
  DeleteInfo() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    // };

    this.prescriptionService.deleteRx(this.name)
      .subscribe({
        next: (data) => {
          this.getData();
        },
        error: (err) => {
          console.log("error occurred: " + err);
        }
      });
    }
    UpdateInfo() {
      // const options = {
      //   headers: new HttpHeaders({
      //     'Content-type': 'application/json',
      //     'Accept': 'application/json'
      //   })
      // };
       const updatedRx:IRx={
        name:this.name,
        dose: this.dose,
        unit: this.unit,
        frequency:this.frequency

        };
        this.prescriptionService.updateRX(this.name,updatedRx).subscribe({
          next: (data)=>{
            this.getData();
          },
          error: (err)=>{
            console.log("error occurred: " +err);
          }
        });


    }
  
}
