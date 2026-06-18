The brand's "engineering receipt" — a near-black terminal with traffic-light dots and mono type. Build syntax-colored output from the exported spans.

```jsx
<CodeBlock title="change-log · today · verified in CI">
  <Cc># every write, one owner, source-tagged</Cc>{"\n"}
  <Cg>06:04</Cg>{"  morning-sweep    → due_date(M51)      OK"}{"\n"}
  <Cc>$ pytest evals/  →  </Cc><Cg>5 passed</Cg>
</CodeBlock>
```

Spans: `Cg` neon green (OK/strings), `Cc` comment grey, `Ck` violet keyword, `Cs` cyan string, `Cr` red error, `Cy` amber warning. Keep line breaks as literal `{"\n"}` inside the `<pre>`.
