import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private matSnackBar: MatSnackBar) {}

  sendNotification(message: string, hideAfter = 3000) {
    this.matSnackBar.open(message, 'Ukryj', {
      duration: hideAfter,
    });
  }
}
