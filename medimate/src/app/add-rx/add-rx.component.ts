import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../shared/prescription.service';
import { NgForm } from '@angular/forms';
import { IRx } from '../models/IRx';

@Component({
  selector: 'app-add-rx',
  templateUrl: './add-rx.component.html',
  styleUrls: ['./add-rx.component.scss']
})
export class AddRxComponent implements OnInit {
  public saveUnsuccessful = false;
  public name: string;
  public dose: number;
  public unit: string;
  public frequency: string;
  public rxList: IRx[] = [];

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.getData();
  }

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;
    if (!ngForm.valid) {
      this.saveUnsuccessful = true;
      return;
    }
    const data: IRx = {
      name: this.name,
      dose: this.dose,
      unit: this.unit,
      frequency: this.frequency,
    };

    this.prescriptionService.addRX(data).subscribe({
      next: () => {
        this.rxList.push(data);
      },
      error: (err) => {
        console.error("Error occurred: " + err);
      },
    });

    ngForm.resetForm();
  }

  getData() {
    this.prescriptionService.getRXList().subscribe({
      next: (data) => {
        this.rxList = data;
      },
      error: (err) => {
        console.log("Error occurred: " + err);
      },
    });
  }

  DeleteInfo() {
    this.prescriptionService.deleteRx(this.name).subscribe({
      next: () => {
        this.getData();
      },
      error: (err) => {
        console.log("Error occurred: " + err);
      },
    });
  }

  UpdateInfo() {
    const updatedRx: IRx = {
      name: this.name,
      dose: this.dose,
      unit: this.unit,
      frequency: this.frequency,
    };
    this.prescriptionService.updateRX(this.name, updatedRx).subscribe({
      next: () => {
        this.getData();
      },
      error: (err) => {
        console.log("Error occurred: " + err);
      },
    });
  }
}
