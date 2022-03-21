## Connected React Components

[.code-highlight: none]
[.code-highlight: 1-7]
[.code-highlight: 9-11]
[.code-highlight: 12-18]

```javascript
type ListerContainerState = {
  activeNavigation: Array<NavCategory>,
};

const mapStateToProps = (state: AppState): ListerContainerState => ({
  activeNavigation: getMenuCategoryFromURL(state),
});

type OwnProps = {/* ... */};
type ReduxActions = typeof mapDispatchToProps;
type ReduxState = $Exact<ExtractReturn<typeof mapStateToProps>>;

export type Props = {|
  ...ReduxActions,
  ...ReduxState,
  ...OwnProps
|};
```

---

## React __Children__

```javascript
import * as React from 'react';

type Props = {
  children?: React.Node
};
```

---

## React __Components__

```javascript
import * as React from 'react';

class Lister extends React.Component<PropTypes, StateType> {
  /* ... */
}
```

---

## React __Higher order components__

```javascript
import * as React from 'react';

const HOC = (Component: React.ComponentType<*>) =>
  (props: PropTypes) =>
    <Component {...props} />;
```

---
## Typing selectors

[.code-highlight: all]
[.code-highlight: 1]
[.code-highlight: 3]

```javascript
export const selectedVariantHasStockSelector: AppState => boolean = createSelector(
  selectedVariantSelector,
  (variant: ColorVariant) =>
    !!variant && variant.skus.reduce((acc, sku) => acc || hasStock(sku), false),
);
```

---

## Redux __immutable__

```javascript
type State = {
  +users: Array<{
    +id: string,
    +name: string,
    +age: number,
    +phoneNumber: string,
  }>,
  +activeUserID: string,
  // ...
};
```
---

## Inference

[.code-highlight: 1-5]
[.code-highlight: 6-10]

```javascript
declare function convert <A>(
  output: A,
  fn: (query: string) => A,
  fn2: (query: string) => A
): void;

// Expected errors, but didn't get
convert(
  1, // <- this value specifies type A to be number
  function(a: string) { return 1; },
  function(a: string) { return '1'; } // <- here it returns a string which is a wrong type, but flow didn't get it
);
```

---

[.build-lists]

## Any vs Star

* any performs type erasal
* star performs type inference

---

## Editor integration

* Atom with Nuclide
* VScode

---

## Command line

* `$ flow --show-all-branches`
* `$ flow-typed install`
