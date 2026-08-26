const fs=require('fs');
const s=fs.readFileSync('src/routes/dashboard/person.$id.tsx','utf8');
const lines=s.split('\n');
let p=0,b=0;
for(let i=0;i<lines.length;i++){
  const lo=(lines[i].match(/\(/g)||[]).length;
  const lc=(lines[i].match(/\)/g)||[]).length;
  const bo=(lines[i].match(/{/g)||[]).length;
  const bc=(lines[i].match(/}/g)||[]).length;
  p+=lo-lc; b+=bo-bc;
  if(i+1>=560 && i+1<=624){
    console.log(i+1, 'p=',p,'b=',b, lines[i].trim());
  }
}
console.log('done');
