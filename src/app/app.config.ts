import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { FlashCardsEffects } from './state/flash-cards.effects';
import { reducer as flashCardsReducer } from './state/flash-cards.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    // NGRX store
    provideStore({ flashCards: flashCardsReducer }),
    // NGRX effects
    provideEffects([FlashCardsEffects]),
    // NGRX devtools
    // SEE: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    // Not required but it is quite a nice tool!
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
