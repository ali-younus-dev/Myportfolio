const fs = require('node:fs');
const assert = require('node:assert/strict');
global.window = {};
require('./projects.js');
const {projects,sections}=window.PORTFOLIO;
assert.equal(projects.length,10);
assert.equal(new Set(projects.map(p=>p.id)).size,10);
for(const project of projects){
  assert.ok(project.images.length,`${project.id} needs screenshots`);
  assert.ok(project.story.length,`${project.id} needs its case study`);
  for(const img of project.images) assert.ok(fs.existsSync(img.src),`Missing asset: ${img.src}`);
}
assert.equal(sections.more.length,9);
assert.equal(sections.depth.length,4);
assert.ok(!projects.some(p=>p.id==='web'),'Original unpublished project must stay unpublished');
const html=fs.readFileSync('index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  const target=match[1];
  if(!/^(https?:|data:|#)/.test(target))assert.ok(fs.existsSync(target),`Missing local reference: ${target}`);
}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate static DOM IDs');
for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(match[1]),`Missing anchor: ${match[1]}`);
console.log('Verified 10 case studies, all screenshot paths, 9 additional builds, 4 engineering stories, local assets and navigation anchors.');
