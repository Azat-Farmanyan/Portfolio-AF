import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })), // Initial state for element when it doesn't exist
  transition(':enter, :leave', [
    // Animation transitions for element appearance and disappearance
    animate(300), // Animation duration in milliseconds
  ]),
]);
