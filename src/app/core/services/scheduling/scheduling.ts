import { inject, Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from, lastValueFrom, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environment/environment';

export interface Appointment {
  id?: number;
  phone: string; // "dd/mm/yyyy"
  scheduling: string; // "HH:mm"
  time: string;
  email: string;
  metadata?: Date;
}

@Injectable()
export class SchedulingService {
  private db = inject(NgxIndexedDBService);
  private firestore = inject(Firestore);
  private _collectionAppointments = environment.firebase.collections.appointments;

  getAppointments(): Observable<Appointment[]> {
    const cacheAppointmentsAsObservable = this.db.getAll<Appointment>(this._collectionAppointments);
    const cacheAppointments = from(cacheAppointmentsAsObservable);

    return cacheAppointments.pipe(
      map((appointments) => {
        appointments = appointments.sort((a: Appointment, b: Appointment) => a.id! - b.id!);
        const lastAppointmentMetada = appointments[appointments.length - 1]?.metadata;

        if (!appointments || appointments.length === 0) {
          return this.getAppointmentsFirestore();
        }

        if (!!lastAppointmentMetada && this.isTwentyMinutesPassed(lastAppointmentMetada)) {
          return this.getAppointmentsFirestore().pipe(
            map(async (appointments) => {
              this.db.bulkPut('appointments', await appointments);
            })
          );
        }

        return appointments;
      }),
      map((obsOrArray) =>
        obsOrArray instanceof Array ? obsOrArray : lastValueFrom(from(obsOrArray))
      )
    ) as Observable<Appointment[]>;
  }

  getAppointmentsFirestore() {
    const updatedAppointmentsPromise = getDocs(
      collection(this.firestore, this._collectionAppointments)
    ).then((snapshot) => snapshot.docs.map((doc) => doc.data() as Appointment));

    updatedAppointmentsPromise.then((updatedAppointments) => {
      updatedAppointments.forEach((app) => this.db.bulkAdd(this._collectionAppointments, [app]));
    });

    return of(updatedAppointmentsPromise);
  }

  isTwentyMinutesPassed(metadata: Date | string): boolean {
    const saved = new Date(metadata);
    const now = new Date();

    const diffInMs = now.getTime() - saved.getTime();
    const twentyMinutesInMs = 20 * 60 * 1000; // 20 min → ms

    return diffInMs >= twentyMinutesInMs;
  }

  hasExistingAppointment(email: string): Observable<boolean> {
    return this.getAppointments().pipe(
      map((appointments) => appointments.some((a) => a.email === email))
    );
  }

  addAppointment(appointment: Appointment): Observable<any> {
    return from(
      addDoc(collection(this.firestore, this._collectionAppointments), appointment).then(() => {
        return this.addAppointmentsIndexedDB(appointment);
      })
    );
  }

  addAppointmentsIndexedDB(appointment: Appointment) {
    this.db.bulkAdd(this._collectionAppointments, [{ ...appointment, metadata: new Date() }]);
  }

  async isSchedulingAvailable(scheduling: string): Promise<boolean> {
    const appointments = await lastValueFrom(this.getAppointments());
    return !appointments.some((a) => a.scheduling === scheduling);
  }
}
