---
title: LORA
date: 2026-08-23
summary: Almost everything about LORA and some other stuff
math: true
---
Full finetuning is not parameter efficient. Our optimizer holds the full gradient (and in the case of Adam, 2 additional moment buffers for every single weight!). In total you usually need 3-4x the models memory footprint on top of the weights to finetune. And if you want to finetune a model for n different tasks, you require n full copies of the weights.

LORA asks "do we need the full weight matrix to adapt a model to a new task, or can we get away with something smaller?"
## LORA

It turns out that when doing full finetuning on a model the change in the weights ΔW has low intrinsic rank, even though the original weights W is full rank and massive. "The update to the model lives in a much lower dimensional subspace".

Rank allows us to think about how to do this more efficiently: a rank R matrix can be written as the sum of r rank 1 outer products.

We constrain ΔW to rank r; we essentially constrain how many independent "directions of change" its allowed to have without constraining how large the change can be along those directions.

