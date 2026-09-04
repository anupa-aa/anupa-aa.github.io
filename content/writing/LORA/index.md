---
title: lora
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

How does it work? Lets look at the original weight matrix $W_o \in \mathbb{R}^{d \times k}$ . Now instead of learning a change to the weights $\Delta W \in \mathbb{R}^{d \times k}$ we constrain it to a low rank factorisation $$
\Delta W = BA, \quad B \in \mathbb{R}^{d \times r}, \quad A \in \mathbb{R}^{r \times k}, \quad r \ll \min(d, k)
$$
We choose r as a hyperparameter.

The forward pass is now:
$$
h = W_o x + \Delta W_o x = W_o x + BAx
$$
AND $W_o$ is the frozen pretrained weights and BA is trainable! The full $\Delta W$ would have had $d*k$ parameters but now the BA only has $d*r + r*k$ parameters. Usually with LORA in practice we train under 1% of the full parameter amount! Also, Adam's moment buffers get smaller since we only size for A and B and not the full $W_o$ !

## Initialisation


## Scaling factor

## Which weight matrices get adapted?

## No inference time cost

## Comparison to other PEFT

## Variants

## Limitations in choosing r and $\alpha$
