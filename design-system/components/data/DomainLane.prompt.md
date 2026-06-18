The signature "four domains" row — a labelled, color-coded flowing track with a mono count. Stack four to show life balance; dim the neglected ones with `quiet`.

```jsx
<DomainLane name="Work / company" sub="build, GTM, capital" domain="work" count="48 today" />
<DomainLane name="Health" sub="lift, cardio, PT" domain="health" count="11d since PT" quiet delay={0.6} />
<DomainLane name="People" sub="date night, family" domain="people" count="3 owed" quiet delay={1.1} />
<DomainLane name="Growth" sub="panels, mentoring" domain="growth" count="on hold" quiet delay={1.6} />
```

`domain` sets the color (work amber / health teal / people orange / growth violet). Stagger `delay` across lanes so the flows don't sync.
