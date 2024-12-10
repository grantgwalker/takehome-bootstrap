import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducer as flashCardsReducer } from './state/flash-cards.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { FlashCardsEffects } from './state/flash-cards.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    // NGRX store
    provideStore({ flashCards: flashCardsReducer }),
    // NGRX effects
    provideEffects(FlashCardsEffects),
    // NGRX devtools
    // SEE: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    // Not required but it is quite a nice tool!
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
