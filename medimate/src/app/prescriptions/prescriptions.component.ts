import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../shared/prescription.service';
import { IRx } from '../models/IRx';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
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
        this.rxList = []; // Ensure list is reset on error
      }
    });
  }

  onDelete(item: IRx) {
    this.prescriptionService.deleteRx(item.name).subscribe({
      next: () => {
        // Remove the item from the local list immediately
        this.rxList = this.rxList.filter(rx => rx.name !== item.name);
      },
      error: (err) => {
        console.error('Error occurred while deleting prescription:', err);
        // Optionally, you could add error handling to show a message to the user
      }
    });
  }
}