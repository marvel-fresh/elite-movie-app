const fs=require('fs');
const s=fs.readFileSync('src/routes/dashboard/person.$id.tsx','utf8');
const lines=s.split('\n');
const stack=[];
for(let i=0;i<lines.length;i++){
  const line=lines[i];
  for(let j=0;j<line.length;j++){
    const ch=line[j];
    if(ch==='(') stack.push({line:i+1,col:j+1});
    if(ch===')') stack.pop();
  }
}
console.log('unmatched parens:', stack);
