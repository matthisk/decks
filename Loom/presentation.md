# Project Loom

* Virtual threads on the JVM (think go-routines)
  * Low memory overhad ~250 bytes per "virtual thread"
  * **No** context switching!
* Easy to make blocking code non-blocking
* Future of concurrency on the JVM

---

```
 ------------
 < Demo! > 
 ------------
          \
           \
               __
              / _)
     _/\/\/\_/ /
   _|         /
 _|  (  | (  |
/__.-'|_|--|_|
```

---

# Pros vs. Cons

| Cons | Pros |
| ---- | ---  |
| Implicit asynchrony | Backwards compatible |
| Clumsy API's (e.g. Thread.sleep) | Finally a proper concurrency primitive |
|  | No need for complex asynchronous code |
