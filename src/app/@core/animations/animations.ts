import { animate, query, sequence, stagger, style, transition, trigger } from '@angular/animations';

export const ROUTE_ANIMATIONS_ELEMENTS = "route-animations-elements";

const STEPS_ALL: any[] = [
  query(":enter > *", style({ opacity: 0, position: "fixed" }), {
    optional: true
  }),
  query(":enter ." + ROUTE_ANIMATIONS_ELEMENTS, style({ opacity: 0 }), {
    optional: true
  }),
  sequence([
    query(
      ":leave > *",
      [
        style({ transform: "translateY(0%)", opacity: 1 }),
        animate(
          "0.2s ease-in-out",
          style({ transform: "translateY(-3%)", opacity: 0 })
        ),
        style({ position: "fixed" })
      ],
      { optional: true }
    ),
    query(
      ":enter > *",
      [
        style({
          transform: "translateY(-3%)",
          opacity: 0,
          position: "static"
        }),
        animate(
          "0.5s ease-in-out",
          style({ transform: "translateY(0%)", opacity: 1 })
        )
      ],
      { optional: true }
    )
  ]),
  query(
    ":enter ." + ROUTE_ANIMATIONS_ELEMENTS,
    stagger(100, [
      style({ transform: "translateY(15%)", opacity: 0 }),
      animate(
        "0.5s ease-in-out",
        style({ transform: "translateY(0%)", opacity: 1 })
      )
    ]),
    { optional: true }
  )
];

export const routeAnimations = trigger("routeAnimations", [
  transition("* => *", [
    style({ transform: "translateX(-100%)" }),
    animate(100)
  ])
]);
