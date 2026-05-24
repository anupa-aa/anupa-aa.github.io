<%*
let title = await tp.system.prompt("Post title");
if (!title) { return; }                 // cancelled / empty → abort, no crash
title = title.trim();
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
if (!slug) { return; }                   // title had no usable characters → abort
const safeTitle = title.replace(/"/g, '\\"');  // keep YAML valid if title has quotes
await tp.file.move("/content/writing/" + slug + "/index");
-%>
---
title: "<% safeTitle %>"
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
draft: true
math: true
summary: ""
---
