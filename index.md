---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<style>
.links line {
  stroke: #aaa;
}

.nodes circle {
  pointer-events: all;
  stroke: none;
  stroke-width: 40px;
  fill: #aaa;
}

.nodes text {
    dominant-baseline: middle;
    text-anchor: middle;
}
</style>
<svg class="projects" width="600" height="600"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="/projects.js"></script>
