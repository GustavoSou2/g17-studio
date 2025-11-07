import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environment/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

registerLocaleData(ptBr);

const dbConfig: DBConfig = {
  name: 'g17-db',
  version: 1,
  isDefault: true,
  objectStoresMeta: [
    {
      store: 'appointments',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'scheduling', keypath: 'scheduling', options: { unique: false } },
      ],
    },
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideIndexedDb(dbConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
};
