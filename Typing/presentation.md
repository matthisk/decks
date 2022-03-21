## Advanced Type Theory

### For the masses

---

## Subtyping

When a set of values in one type, $$T$$, is a subset of the set of values in another type, $$U$$
<br?>
we say that $$T$$ is a **subtype** of $$U$$

---

## Subtyping

So $$[1\ to\ 10]$$ is a **subtype** of $$int$$
<br>
But also $$int$$ is a **subtype** of $$num$$
<br>
$$int \in num$$
<br>
functions written to operate on elements of $$int$$ also operate on elements of $$num$$

---

## Variance

$$A: nat \in int \in num$$
<br>
Given $$A$$, what types are acceptable subtypes of the following function
<br>
$$int \to int$$

---

## Variance

$$int \to num$$
<br>
Being **less specific** about the return type does not require us to change the internals

---

## Variance

$$nat \to int$$
<br>
Being **more restrictive** of the function input, does not require changes to the function internals

---

## Variance and Generics

What happens to the subtyping relation of generics?
<br>
Consider `Source<int>`, that we can `get` the value from.

---

## Variance and Generics

`Source<int>` can be treated as `Source<num>`

<!--
It couldn't be treated as `Source<nat>` because we could potentially get a negative number as `nat`
-->

---

## Variance and Generics

Now consider `Sink<int>` that we can `put` the value in.

---

## Variance and Generics

`Sink<int>` can be treated as `Sink<nat>`

<!--
It couldn't be treated as `Sink<num>` because we could put a fractional as an int, which is an unexpected value
-->

---

## Variance and Generics

Thus `Source<int>` can be treated as `Source<num>`
<br>
While `Sink<int>` can be treated as `Sink<nat>`

---

## Co-variance

Since 

$$nat \in num$$ 

and 

`Sink<nat>` $$\in$$ `Sink<int>` 

the relation is the same <sub>(or co-)</sub>

---

## Contra-variance

Though

$$int \in num$$ 

and

`Source<num>` $$\in$$ `Source<int>`

the relation is opposite <sub>(or contra-)</sub> 

---

## Open Recursion

> Open recursion is the ability for one method body to invoke another method of the same object via a special variable. The special behavior of this variable is that it is late-bound, allowing a method defined in one class to invoke another method that is defined later, in some subclass of the first.

---

## Dynamic dispatch

> The process of selecting which implementation of a polymorphic operation (method or function) to call at run time. 

<!--
The most well known example would be in the JavaScript lanaguage, where the runtime will have to traverse the prototype chain at runtime after a function invocation to find which function has to be invoked.
-->

---

### Subtyping vs Inheritance

$$A \in B$$, if every function that can be invoked on an object of type $$A$$ can also be invoked on an object of type $$B$$. 
<br>
$$A\ extends\ B$$,  type $$B$$ inherits from another type $$A$$ if some functions for $$B$$ are written in terms of functions of $$A$$. 

<!-- 
However, subtyping and inheritance need not go hand in hand. Consider the data structure deque, a double-ended queue. A deque supports insertion and deletion at both ends, so it has four functions insert-front, delete-front, insert-rear and delete-rear. If we use just insert-rear and delete-front we get a normal queue. On the other hand, if we use just insert-front and delete-front, we get a stack. In other words, we can implement queues and stacks in terms of deques, so as datatypes, Stack and Queue inherit from Deque. On the other hand, neither Stack not Queue are subtypes of Deque since they do not support all the functions provided by Deque. In fact, in this case, Deque is a subtype of both Stack and Queue! 
-->

---

### Nominal subtyping

> in which only types declared in a certain way may be subtypes of each other

### Structural subtyping

> in which the structure of two types determines whether or not one is a subtype of the other.

---

### Widening

> A conversion from a subtype to a supertype is called a widening conversion. It is called a widening conversion because it goes from a smaller type(the subtype) to a bigger type

### Narrowing

>  A conversion from a supertype to a subtype is called a narrowing conversion. It is called a narrowing conversion because it goes from a bigger type (supertype) to a smaller type (subtype).