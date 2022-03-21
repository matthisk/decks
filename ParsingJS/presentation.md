# Parsing JavaScript.

--- 

[.build-lists: true]

# 👹 Why? 

---

# Parse this

```javascript
x
++
y
```

---

# Parse that

```javascript
function fn() {
  throw /* multiline comment 
  with newline */ new Error('hello world');
}
```

---

# Parse asi

```javascript
{ 3.0
  2.0 } 1.0
```

---

# How?

* Lexer -> Tokens
* Parser -> AbstractSyntaxTree
