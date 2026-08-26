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

const lines = s.split('\n');
let p=0,b=0;
let maxP={val:0,line:0}, maxB={val:0,line:0};
for(let i=0;i<lines.length;i++){
  const lo = (lines[i].match(/\(/g)||[]).length;
  const lc = (lines[i].match(/\)/g)||[]).length;
  const bo = (lines[i].match(/{/g)||[]).length;
  const bc = (lines[i].match(/}/g)||[]).length;
  p += lo - lc;
  b += bo - bc;
  if(p>maxP.val){maxP.val=p;maxP.line=i+1}
  if(b>maxB.val){maxB.val=b;maxB.line=i+1}
}
console.log('final p=',p,'b=',b,'maxParen:',maxP,'maxBrace:',maxB);
