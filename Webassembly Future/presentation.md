# WebAssembly: future

--- 

*WebAssembly's* current iteration is a **minimal viable product**. Many **new features** are coming to *WebAssembly* in the (near) future.

--- 

## Proposal 1: Threads

* new shared linear memory type
* operations for atomic memory access
* shared memory between threads, atomics and futexes.
* impacted by Spectre (since SharedArrayBuffer had to be disabled)

[Proposal](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md)

---

## Proposal 2: Web IDL bindings

* Requires reference types
* Kill the call overhead through JS to the DOM
* Let's wasm module declare what glue must be applied to its imports and exports

<!--
To speed things up, there’s a proposal that we’ve been calling the Web IDL bindings proposal. It let’s a wasm module declare what glue must be applied to its imports and exports, so that the glue doesn’t need to be written in JS. By pulling glue from JS into wasm, the glue can be optimized away completely when calling builtin Web APIs.
-->

[Proposal](https://github.com/WebAssembly/webidl-bindings)

---

## Proposal 3: Garbage Collection

* No longer need to compile GC
* Efficient support for high-level languages

[Proposal](https://github.com/WebAssembly/gc/blob/master/proposals/gc/Overview.md)

---

* [WebAssembly post MVP](https://hacks.mozilla.org/2018/10/webassemblys-post-mvp-future/) by Lin Clark

