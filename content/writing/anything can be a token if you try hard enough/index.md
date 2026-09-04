---
title: anything can be a token if you try hard enough
date: 2026-05-20
draft: true
summary: Technical report xxx
math: true
---
This is just a template
## Example

The cost of self attention is quadratic in sequence length $n$:

$$\text{Attn}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V$$

For an image split into $n$ patches, that $O(n^2)$ term is what makes
high resolution ViTs expensive. 

```python
def attention(q, k, v, d_k):
    scores = (q @ k.transpose(-2, -1)) / d_k ** 0.5
    return scores.softmax(dim=-1) @ v
```

blah blah lah