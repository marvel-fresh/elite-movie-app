const fs = require('fs');
const path = 'src/routes/dashboard/person.$id.tsx';
const s = fs.readFileSync(path,'utf8');
const counts = {
  parenOpen: (s.match(/\(/g)||[]).length,
  parenClose: (s.match(/\)/g)||[]).length,
  braceOpen: (s.match(/{/g)||[]).length,
  braceClose: (s.match(/}/g)||[]).length,
  angleOpen: (s.match(/</g)||[]).length,
  angleClose: (s.match(/>/g)||[]).length,
  fragmentOpen: (s.match(/<>/g)||[]).length,
  fragmentClose: (s.match(/<\/>/g)||[]).length
};
console.log('counts:', counts);

// Find line-by-line balance for braces and parentheses
const lines = s.split('\n');
let p=0,b=0;
for(let i=0;i<lines.length;i++){
  const lo = (lines[i].match(/\(/g)||[]).length;
  const lc = (lines[i].match(/\)/g)||[]).length;
  const bo = (lines[i].match(/{/g)||[]).length;
  const bc = (lines[i].match(/}/g)||[]).length;
  p += lo - lc;
  b += bo - bc;
  if(p<0||b<0) console.log('imbalance at line', i+1, 'p=',p,'b=',b, 'line:', lines[i].trim());
}
console.log('final p=',p,'b=',b);
