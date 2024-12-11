import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../shared/prescription.service';
import { IRx } from '../models/IRx';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  public name: string;
  public dose: number;
  public unit: string;
  public frequency: string;
  public rxList: IRx[] = [];

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.prescriptionService.getRXList().subscribe({
      next: (data) => {
        this.rxList = data;
      },
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      }
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

  onDelete(name: string) {
    this.prescriptionService.deleteRx(name).subscribe({
      next: () => {
        this.getData();
      },
      error: (err) => {
        console.error('Error occurred while deleting prescription:', err);
      }
    });
  }
}
