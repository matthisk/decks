footer: m@tthisk.nl
slidenumbers: true

![filtered 50%](background1.jpg)

# Workshop:
## integration testing

---

[.build-lists: true]

![filtered 50%](background2.jpg)

# Session Goals

* Anybody can write BE integration-tests 🍾
* General understanding of e2e testing
* Setup development environment
* _CI integration_

---

[.build-lists: true]

## What?

* End to end test our backend API's
* Validate responses against Swagger definitions
* Multi-tenancy support
* Setup methods to guarantee consistent starting state

---

## How?

* JavaScript
* NodeJS
* Jest testing framework
* Hippie (swagger)
* CircleCI

---

[.build-lists: true]

## Integration testing fundamentals

* Running tests against a consistent state.
* How to deal with: eventual consistency?
* To test __or not to test__
* Tenant agnostic test cases.
* Swagger contracts

---

## Hippie JS

[Hippie Docs](https://github.com/vesln/hippie)

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

## Hippie JS (Swagger)

https://github.com/vesln/hippie

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

## Utility

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

## Describing tests suites

* Standard Jest/Mocha type test suites
* Tests run sequentially through `--runInBand`

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

## Describing tests suites

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
```

---

## Assertions

* Standard Jest `expect` assertions

```javascript
// assertions
expect(result).toEqual({ /* .... */ });
expect(result).toBe(10);
expect(result).toMatchSnapshot();
```

---

## Assertions

* Tenant specific extension

```javascript
// assertions
expect(rest).toMatchTenantSpecificSnapshot('name');
```

---

## Dealing with eventual consistency

* It may take some time for data to converge between services on the backend
* Tests should retry a condition iteratively within a certain timeframe

```javascript
const eventually = require('./commons/eventually');

await eventually(30 * 1000, async () => {
  // test something
});
```

---

## Setting up data before a test

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

## Workshop

__BRANCH__

`git checkout tech/integration-testing-workshop`

---

## Development environment

```bash
$ cd integration-tests
$ yarn
# Atom users
$ atom .
# VSCode users
$ vscode .
```

---

## Multi-tenancy support through dot-env

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

## Running the suite

```bash
$ jest src --runInBand
```

Enable additional runtime output:

```bash
$ DEBUG=1 jest src --runInBand
```

---

### Let's write some code

* Ingesting order status xml __checkout.test.js__
* Updating / Reading products __products.test.js__
* Searching products __products.search.test.js__
* Product pushes __products.search.test.js__
* Prismic integration (storelocator)