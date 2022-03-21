footer: m@tthisk.nl
slidenumbers: true

![filtered 50%](background1.jpg)

# Fusion JS

### A middleware powered universal web-framework

---

![filtered 50%](background2.jpg)

# Has anybody used Fusion.JS?

---

[.build-lists: true]

## What is it?

* __Plugin based__ universal web-framework
* A __Webpack__ configuration
* __Dependency injection__ system
* Set of __plugins__ `(maintained by core-team)`
* __Koa__ based HTTP server

---

## Packages

* __fusion-core__ -> contains plugin and app wiring code
* __fusion-cli__ -> contains Webpack configuration
* __fusion-react__ -> contains React integration
* __fusion-__... -> plugins

---

## Why is it different?

* Middleware based `(plugin system)`
* Framework agnostic
* Type-safe `(flow-type)`

---

## Why do we need this?

Current solutions (e.g. *next.js*) tie you down to specific __frontend-technology__.
<br/>
It is __hard__ to roll your own solution.
<br/>
Middlewares are the __right abstraction__ for universal frontend *rendering boilerplate*.

---

![](background4.jpg)

# Creating a Fusion.JS Application


^ There is some scaffolding setup with Yarn

---

## Setup (1/3) *std*

[.code-highlight: all]
[.code-highlight: 4]

```javascript
import App from 'fusion-core';

export default () => {
  return new App('hello world', e => e);
};
```

Start the app:

```bash
$ fusion dev --port 3000
```

---

## Setup (2/3) *using plugins*

[.code-highlight: all]
[.code-highlight: 6]

```javascript
import App from 'fusion-core';

export default () => {
  const app = new App('hello world', e => e);

  app.register(SomeToken, Plugin);

  return app;
};
```

---

## Setup (3/3) *React*

[.code-highlight: 4-9]

```jsx
import React from 'react';
import App from 'fusion-react';

export default () => {
  return new App(
    <p>hello world</p>,
    /* custom renderer (el: React.Element) => any) */
  );
};
```

---

![](background3.jpg)

# Creating a Fusion.JS Plugin

---

## Plugin Architecture (1/4)
### Structure

* Token
* Dependencies
* Service
* Middleware

---

## Plugin Architecture (2/4)
### Tokens

* Tokens are used for *dependency injection*
* Tokens are used for *interface declaration*

^ For example injecting the reducer into a redux plugin

---

## Plugin Architecture (2/4)
### Tokens

[.code-highlight: 2-9]
[.code-highlight: 10]

```javascript
import { createToken } from 'fusion-core';
export type Session = {
  from(
    ctx: Context
  ): {
    get(keyPath: string): any,
    set(keyPath: string, val: any): void,
  },
};
export const SessionToken: Token<Session> = createToken('SessionToken');
```

---

## Plugin Architecture (3/4)
### Services

* Deps are used to inject other services
* Services adhere to a token interface and can be used by other plugins

---

## Plugin Architecture (3/4)
### Services

[.code-highlight: 3]
[.code-highlight: 4-10]

```javascript
import { createPlugin } from 'fusion-core';
export default createPlugin({
  deps: { logger: LoggerToken },
  provides({ logger }) {
    return {
      sayHello(name) {
        logger.log('Hello', name);
      }
    };
  }
});
```

---

## Plugin Architecture (4/4)
### Middleware

* Middleware code is executed on client & server
* Server-side it is executed around a *request*/*response* cycle
* Client-side it is executed around *DOM hydration*

^ Best example is Redux, on the server we initialize the store render and serialize. On the client we hydrate the store from a DOM node.

---

## Plugin Architecture (4/4)
### Context Object

All middleware is supplied with an enriched *Koa* context object.

* __element__: `React.Element<*>`
* __template__: `(title, head, body)`

---

## Plugin Architecture (4/4)
### Middleware

Types:

```javascript
middleware:
  (deps: Object, service: T) =>
    (ctx: FusionContext, next: () => Promise) => Promise
```

---

[.code-highlight: 2]
[.code-highlight: 3-12]

```javascript
export default createPlugin({
  deps: {Session: SessionToken},
  middleware({Session}) {
    return (ctx, next) => {
      if (ctx.query.name) {
        const session = Session.from(ctx);
        session.set('name', ctx.query.name);
        ctx.body = {ok: 1};
      }
      return next();
    }
  }
});
```

---

## Interesting Features
### Async data-fetching at component level during SSR

[.code-highlight: 3]
[.code-highlight: 5]
[.code-highlight: 7]

```javascript
import { prepared } from 'fusion-react';

const UserContainer = (props) => /* ... */;

const hoc = prepared(
  (props, ctx) => fetch(`/api/users/${props.id}`), opts);

export default hoc(UserContainer);
```

^ Not 100% sure how this state is propagated to the client?

---

## Interesting Features
### Code splitting

[.code-highlight: 4-10]

```javascript
import React from 'react';
import {split} from 'fusion-react';

const Hello = split({
  load: () => import('./components/hello');
  LoadingComponent,
  ErrorComponent
});
```

---

## Upsides

* Documentation is in great shape
* Readable codebase sensibly split among different repositories
* Extensible
* Repertoire of common plugins

---

## Downsides

* No build-tool configuration / customization
* Funky hand rolled dependency injection framework
* No HTTPS support yet

---

[.build-lists: true]

## Discussion

* How could build tool configuration be customized?
* Is there a better approach to the funky DI system?

---

## Interesting source code

* [Server Side Rendering](https://github.com/fusionjs/fusion-core/blob/master/src/plugins/ssr.js) *(core)*
* [Server App](https://github.com/fusionjs/fusion-core/blob/master/src/server-app.js) *(core)*
* [Client App](https://github.com/fusionjs/fusion-core/blob/master/src/client-app.js) *(core)*
* [Server entry](https://github.com/fusionjs/fusion-cli/blob/master/entries/server-entry.js) *(cli)*
* [Client entry](https://github.com/fusionjs/fusion-cli/blob/master/entries/client-entry.js) *(cli)*
* [Webpack configuration](https://github.com/fusionjs/fusion-cli/blob/master/build/compiler.js) *(cli)*
* [Redux plugin](https://github.com/fusionjs/fusion-plugin-react-redux/tree/master/src) *(plugin)*
