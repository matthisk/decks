footer: m@tthisk.nl
slidenumbers: true
build-lists: true

![filtered 50%](background1.jpg)

# [fit] Workshop
## [fit] integration testing with Hippie

---

# Session Goals

- Write your own backend integration test 🍾
- General understanding of e2e testing on the backend
- Setup development environment
- bonus: CI integration

---

## __What?__

* End to end test our backend API's
* Validate responses against Swagger definitions
* Multi-tenancy support
* Setup methods to guarantee consistent starting state

---

## __How?__

* JavaScript
* NodeJS
* Jest testing framework
* Hippie (swagger)
* CircleCI

---

[.build-lists: true]

## __Integration testing fundamentals__

* Running tests against a consistent state.
* How to deal with: eventual consistency?
* To test __or not to test__
* Tenant agnostic test cases.
* Swagger contracts

---

## [Hippie JS](https://github.com/vesln/hippie)

[.code-highlight: all]
[.code-highlight: 1]
[.code-highlight: 2]
[.code-highlight: 3]
[.code-highlight: 4]
[.code-highlight: 5]
[.code-highlight: 6]
[.code-highlight: 7]

```javascript
hippie()
  .header("User-Agent", "hippie")
  .json()
  .get('https://api.github.com/users/vesln')
  .expectStatus(200)
  .expectBody({})
  .end(); // <- forget this and nothing will happen
```

---

## [Hippie JS (Swagger)](https://github.com/vesln/hippie)

[.code-highlight: all]
[.code-highlight: 2]
[.code-highlight: 10]

```javascript
async function() {
  const swagger = await loadSwagger('nl.houseofbrands.checkout.shoppingbag.gateway.yaml');

  return hippieSwagger(swagger)
    .base('https://acc.costesfashion.com/')
    .json()
    .get('/api/v1/shoppingbag')
    .expectStatus(200)
    .expectBody({})
    .end(); // <- forget this and nothing will happen
}
```

---

## __Utility__

```javascript
const api = require('./commons/hippie');

async function() {
  const swagger = await loadSwagger('nl.houseofbrands.checkout.shoppingbag.gateway.yaml');

  return api(swagger)
    .get('/api/v1/shoppingbag')
    .expectStatus(200)
    .expectBody({})
    .end(); // <- forget this and nothing will happen
}
```

---

## __Describing tests suites__

* Standard Jest/Mocha type test suites
* Tests run sequentially through `--runInBand`

---

## __Describing tests suites__

```javascript
describe('Shoppingbag', () => {
  beforeAll(async () => {
    // initialize data to run test case
  });

  test('create', async () => {
  });

  test('add item', async () => {
  });

  test('remove item', async () => {
  });
});
```

---

## __Describing tests suites__

```javascript
describe('Shoppingbag', () => {
  test('create', async () => {
    const res = await api(swagger) // <- this is our commons/hippie method from before
      .post('/api/v1/shoppingbags')
      .send({})
      .expectStatus(201)
      .end();

    const body = JSON.parse(res.body);
    
    // assertions
  });
  
  // ...
});
```

---

## __Assertions__

### Standard Jest `expect` assertions

```javascript
// assertions
expect(result).toEqual({ /* .... */ });
expect(result).toBe(10);
expect(result).toMatchSnapshot();
```

---

## __Assertions__

### Tenant specific extension

```javascript
// assertions
expect(rest).toMatchTenantSpecificSnapshot('name');
```

---

## __Setting up data before a test__

[.build-lists: false]

* Test cases rely on consistent state across test runs
* Initialize state within a `beforeAll` hook

```javascript
const { setup } = require('./commons/load-data');

beforeAll(async () => {
  await setup({
    { productId: '308334', skus: ['308334001'] },
    { productId: '308351', skus: ['308351001'] },
  });
});
```

---

## __Dealing with eventual consistency__

* It may take some time for data to converge between services on the backend
* Tests should retry a condition incrementally within a certain timeframe

```javascript
const eventually = require('./commons/eventually');

await eventually(30 * 1000, async () => {
  // test something
});
```

---

## __Workshop__

__Checkout BRANCH__

`tech/integration-testing-workshop`

---

## __Development environment__

```bash
$ cd integration-tests
$ yarn
# Atom users
$ atom .
# VSCode users
$ vscode .
```

---

## __Multi-tenancy support through dot-env__

* Copy `.env.example` to `.env`

```
TENANT=costes
FRONTEND_GATEWAY_HOST=https://acc.costesfashion.com
SERVICE_GATEWAY_HOST=https://hobacc-sgw.networkofbrands.com
PAYMENT_SERVICE_HOST=https://hobacc.networkofbrands.com/service/payment
ADYEN_CREDENTIALS='Basic YWR5ZW46dGVzdA=='
LANGUAGE='nl-nl'
```

---

## __Running the suite__

```bash
$ jest src --runInBand
```

Enable additional runtime output:

```bash
$ DEBUG=1 jest src --runInBand
```

---

## __Let's write some code__

* Ingesting order status xml __checkout.test.js__
* Updating / Reading products __products.test.js__
* Searching products __products.search.test.js__
* Product pushes __products.search.test.js__
* Prismic integration (storelocator)