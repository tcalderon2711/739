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

  // Improved delete logic with re-fetch
  onDelete(item: IRx) {
    // Delete prescription from the backend first
    this.prescriptionService.deleteRx(item.name).subscribe({
      next: () => {
        // After deletion, re-fetch the entire list
        this.getData();  // Re-fetch to ensure the list is updated correctly
      },
      error: (err) => {
        console.error('Error occurred while deleting prescription:', err);
      }
    });
  }
}
