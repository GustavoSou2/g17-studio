import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable()
export class CalendarAuth {
  private auth = inject(Auth);
  private api = inject(HttpClient);

  loginWithGoogle(scheduling: string = '04/11/2025', time: string = '09:00') {
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/calendar');

    provider.setCustomParameters({
      prompt: 'consent',
    });

    return signInWithPopup(this.auth, provider).then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      const { startDate, endDate } = this.transformDate(scheduling, time);

      const pad = (n: number) => n.toString().padStart(2, '0');

      const toGoogleDateTime = (date: Date) => {
        const tzOffset = -date.getTimezoneOffset(); // minutos
        const sign = tzOffset >= 0 ? '+' : '-';
        const hours = pad(Math.floor(Math.abs(tzOffset) / 60));
        const minutes = pad(Math.abs(tzOffset) % 60);
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
          date.getHours()
        )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${hours}:${minutes}`;
      };

      const event = {
        summary: 'G17 Studio - Reunião de Alinhamento',
        description: 'Reunião para conhecer melhor sua empresa',
        start: { dateTime: toGoogleDateTime(startDate) },
        end: { dateTime: toGoogleDateTime(endDate) },
      };

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      return response.json();
    });
  }

  transformDate(scheduling: string, time: string) {
    const [day, month, year] = scheduling?.split('/').map(Number);
    const [hour, minute] = time?.split(':').map(Number);

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    return {
      startDate,
      endDate,
    };
  }
}
