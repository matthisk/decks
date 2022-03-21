[.slidenumbers: true]

# Nix
## The purely functional package manager

---

[.build-lists: true]

## What is nix

* package manager
* language
* package library
* operating system
* deployment system
* distributed deployment tool
* Hydra CI system

---

# The nix package manager

* pure
* deterministic
* composable
* elegant

---

[.build-lists: true]

# The big idea

* Functional programming has told the world:
  - globals should be banished
  - effects should be controlled
  - mutation should be minimized
* We're slowly learning these lessons in our code
  - But what about operating systems

---

# The current state of affairs

* Traditional operating systems are built on globals and mutation
  - What is `/usr/local/bin/git`?
  - When you install something, what happens?

^ installing a package is like a inplace mutation

---

[.build-lists: true]

# Problems with current state of affairs

* In-place mutation cannot be undone and is hard to trace
* In-place mutation is hard to do atomically, so upgrades are dangerous
* Complex dependencies become hard or impossible to support (the dreaded diamond)
* Install can cause unintended breakage
* Rollbacks can only be supported via snapshotting which is fragile and non composable
* Package composition is unwieldy and error prone (e.g. `./configure` scripts)
* Declarative system configuration is extremely difficult and systems tend to "drift"
* Testing your packages in different configurations, environments, etc. is a nightmare

---

# The solution?

> Don't do that
-- Nix

---

# Deterministic packages

* A nix package is identified by a deterministic hash function of all its inputs, all its dependencies, and all its outputs.
  - No cheating: Packages are built in an isolated environment with access only to declared inputs
  - No time: All time stamps are fixed at the Unix epoch.
  - No shortcuts: No incremental builds and often disable parallel builds if they can't be proven to be deterministic
* This means package definitions are like pure functions: same input means same output

---

# No globals or immutable env

* `/usr/local/bin` is a mutable global - a mutable list of all installed executables. In fact, the contents of the executables are even mutable (via an upgrade)
* Nix packages cannot use mutable globals - this would destroy determinism
* Instead, each package refers to its dependencies using their unique hash
* If a dependency changes, the package's own hash changes too.
* A user environment is represented by a profile which is a set of symlinks to packages.

---

# Implications

* Packages can have complex dependency requirements without affecting other packages:
  * For example, if curl and git need different versions of OpenSSl, both versions can happily coexist.
* Declarative definitions are:
  * Naturally idempotent.
  * Easy to version control and include entire dependency tree with a single hash
* Changes/upgrades are non-destructive and can:
  * always be rolled back (generations)
  * be done atomically (change a single symlink at the very end)

---

# The command line

* Install nix on macOS or Linux: `$ curl https://nixos.org/nix/install | sh`

We will take a look at the following commands:

* `nix-env` main utility used to install depdencies and alter our profile
* `nix-shell` used to create adhoc environments
* `nix-store` used for garbage collection and dependency inspection

---

# Example

* `$ nix-env -f '<nixpkgs>' -iA git` install git in your profile
* `$ nix-shell -p git` opens a shell with git available
* `$ nix-shell --pure -p git` open a shell with just git available
* `$ nix-shell -p git --run 'git status'`
* `$ realpath $(which git)`

---

# Example 2

* `$ nix-env -qaP 'nodejs'` Query the channel
* `$ nix-env -i nodejs-12.5.0` Install latest nodejs
* `$ nix-store --query --tree git` Show a tree of dependencies
* `$ nix-store --query --graph $(which git) | dot -Tpng > graph.png && open graph.png` Render a tree of dependencies

---

# Profiles

![inline](user-environments.png)

---

# Working with profiles

```bash
$ ls -l /nix/var/nix/profiles
```

```bash
$ nix-env --list-generations
```

```bash
$ nix-env --rollback
```

---

# Example of nix script

---

# nixpkgs

* The nix package database is called "Nixpkgs"
* Nixpkgs is managed entirely with a GitHub repo: https://github.com/nixos/nixpkgs
* Nixpkgs has official releases (called channels) that have long-term support

---

# nixos

* uses nixpkgs for *everything*
  * systemd
  * drivers
  * root installed bash

---

# try it out

```bash
$ curl https://nixos.org/nix/install | sh
```

