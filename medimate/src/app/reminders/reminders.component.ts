import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../shared/prescription.service';
import { IRx } from '../models/IRx';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
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
        console.error('Error occurred while fetching prescriptions:', err);
      }
    });
  }

  setReminder(prescription: IRx) {
    const reminderTime = prompt(`Set a reminder time for ${prescription.name} (e.g., 2:30 am):`);
    if (reminderTime) {
      alert(`Reminder set for ${prescription.name} at ${reminderTime}!`);
    }
  }
}
