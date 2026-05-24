<%*
const title = await tp.system.prompt("Post title");
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
await tp.file.move("/content/writing/" + slug + "/index");
-%>
---
title: "<% title %>"
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
draft: true
math: true
summary: ""
---
