---
title Branch Predictors
date 18th Jun, 2025
last_modified_at
---

Modern processors are very complex, Part of that complexity
comes from "branch predictors". This is just a part of the
processor which tries to predict which part of a branched
code is most likely to be executed before the condition
itself finishes computing.

This is done so that the processor doesn't sit idle waiting
for the condition to be computed, If it knows the branch that's
most likely to be executed, It can start preparing for the branch
or even executing it.

The issue is that a processor has the least amount of context
on the piece of code it's executing because the machine code
is just a list of very simple instructions.

Compilers on the other hand have a different story. A compiler
knows a million times more about your code than the processor.
This is why a compiler is actively trying to figure out what
branch is most likely to be executed so that it can generate
the most efficient code possible.

But once again, Compilers can only do static analysis. They
can't exactly "think" or "understand" what we're doing. This
is why most mainstream compilers provide branch predictor
intrinsics.

Or in simple words, They provide functions using which you
can hint a compiler what branch is most likely to be executed.

Enter `__builtin_expect(expr, val)`, Available in both GCC and
clang, This hint tells that `expr` is most likely equal to `val`.

