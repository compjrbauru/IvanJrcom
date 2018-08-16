import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

export function enterComponent(name: string) {
  return trigger(name, [
    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
    transition('void => *', [
      animate(
        1000,
        keyframes([
          style({
            transform: 'translateY(-100px)',
            opacity: 0,
            offset: 0,
          }),
          style({
            transform: 'translateY(-50px)',
            opacity: 0.5,
            offset: 0.35,
          }),
          style({
            transform: 'translateY(-20px)',
            opacity: 1,
            offset: 0.7,
          }),
          style({
            transform: 'translateY(0px)',
            opacity: 1,
            offset: 1,
          }),
        ]),
      ),
    ]),
    transition('* => void', [
      group([
        animate(
          300,
          style({
            color: 'red',
          }),
        ),
        animate(
          800,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]);
}

export function buttonVerified(name: string) {
  return trigger(name, [
    state(
      'true',
      style({
        backgroundColor: 'red',
        transform: 'scale(1)',
      }),
    ),
    state(
      'false',
      style({
        backgroundColor: 'green',
        transform: 'scale(1.1)',
      }),
    ),
    transition('true => false', [animate('300ms ease-in')]),
    transition('false => true', [
      group([
        animate(300),
        animate(
          300,
          keyframes([
            style({
              transform: 'translateX(-10px)',
            }),
            style({
              transform: 'translateX(+10px)',
            }),
            style({
              transform: 'translateX(-10px)',
            }),
            style({
              transform: 'translateX(+10px)',
            }),
            style({
              transform: 'translateX(0px)',
            }),
          ]),
        ),
      ]),
    ]),
  ]);
}

export function enterLeft(name: string, time: string) {
  return trigger(name, [
    transition('void => *', [
      query(':enter', style({ opacity: 0, transform: 'translateX(-100px)' })),
      query(
        ':enter',
        stagger(time, [
          animate(
            1000,
            keyframes([
              style({
                transform: 'translateX(-100px)',
                opacity: 0,
                offset: 0,
              }),
              style({
                transform: 'translateX(-50px)',
                opacity: 0.5,
                offset: 0.3,
              }),
              style({
                transform: 'translateX(-20px)',
                opacity: 1,
                offset: 0.8,
              }),
              style({
                transform: 'translateX(0px)',
                opacity: 1,
                offset: 1,
              }),
            ]),
          ),
        ]),
      ),
    ]),
    transition('* => void', [
      group([
        animate(
          300,
          style({
            color: 'red',
          }),
        ),
        animate(
          800,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]);
}

export function enterDown(name: string, time: string) {
  return trigger(name, [
    transition('void => *', [
      query(':enter', style({ opacity: 0, transform: 'translateY(-100px)' })),
      query(
        ':enter',
        stagger(time, [
          animate(
            1000,
            keyframes([
              style({
                transform: 'translateY(-100px)',
                opacity: 0,
                offset: 0,
              }),
              style({
                transform: 'translateY(-50px)',
                opacity: 0.5,
                offset: 0.3,
              }),
              style({
                transform: 'translateY(-20px)',
                opacity: 1,
                offset: 0.8,
              }),
              style({
                transform: 'translateY(0px)',
                opacity: 1,
                offset: 1,
              }),
            ]),
          ),
        ]),
      ),
    ]),
    transition('* => void', [
      group([
        animate(
          300,
          style({
            color: 'red',
          }),
        ),
        animate(
          800,
          style({
            transform: 'translateY(100px)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]);
}

export function enterUp(name: string, time: string) {
  return trigger(name, [
    transition('void => *', [
      query(':enter', style({ opacity: 0, transform: 'translateY(+100px)' })),
      query(
        ':enter',
        stagger(time, [
          animate(
            1000,
            keyframes([
              style({
                transform: 'translateY(+100px)',
                opacity: 0,
                offset: 0,
              }),
              style({
                transform: 'translateY(+50px)',
                opacity: 0.5,
                offset: 0.3,
              }),
              style({
                transform: 'translateY(+20px)',
                opacity: 1,
                offset: 0.8,
              }),
              style({
                transform: 'translateY(0px)',
                opacity: 1,
                offset: 1,
              }),
            ]),
          ),
        ]),
      ),
    ]),
    transition('* => void', [
      group([
        animate(
          300,
          style({
            color: 'red',
          }),
        ),
        animate(
          800,
          style({
            transform: 'translateY(-100px)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]);
}
