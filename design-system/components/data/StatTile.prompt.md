Headline metric - a heavy tabular number over a muted caption. The brand states proof in numbers, so reach for this in stat grids and hero metric rows.

```jsx
<StatTile value="99 → 0" label="overdue, held at zero" />
<StatTile value="30+" label="coordinated agents" size="lg" />
<StatTile value="0" label="cross-lane writes, enforced in CI" boxed={false} />
```

`boxed` (default) wraps it in a card; set `boxed={false}` for an inline metric row separated by a top hairline. Sizes `sm | md | lg`.
