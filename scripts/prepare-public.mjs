import fs from 'node:fs';
import path from 'node:path';
import {examsPublished,seniorPublished} from '../src/publication.js';
const root=process.cwd();
const output=path.join(root,'_site');
if(fs.existsSync(output)) throw new Error('_site already exists; use a clean staging directory.');
const hidden=new Set(['src/exams.js','src/exam-data.js','src/senior-exam-data.js','src/scope-search.js','src/exam-scopes.js']);
function copy(relative){
 if(!seniorPublished && /^src\/senior(?:-data|-overview|-exam-data)?\.(?:js|css)$/.test(relative))return;
 if(!examsPublished && (relative==='assets/exams'||hidden.has(relative)))return;
 const source=path.join(root,relative),target=path.join(output,relative);
 if(fs.statSync(source).isDirectory()){fs.mkdirSync(target,{recursive:true});for(const name of fs.readdirSync(source))copy(relative+'/'+name);}
 else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target);}
}
for(const entry of ['index.html','src','assets'])copy(entry);
console.log('Prepared public site; exam archive published: '+examsPublished);

// Filter only generated public copies; shared source modules remain intact.
if(!seniorPublished){
 const shared=await import('../src/advance-writing.js');
 const code=Object.entries(shared).map(([key,value])=>typeof value==='function'?'export '+value.toString(): 'export const '+key+'='+JSON.stringify(Array.isArray(value)?value.filter(x=>Number(x.grade)<10):value)+';').join('\n');
 fs.writeFileSync(path.join(output,'src/advance-writing.js'),code);
 const dataPath=path.join(output,'src/data.js');
 fs.writeFileSync(dataPath,fs.readFileSync(dataPath,'utf8').replace('國高中同步開學；','').replace('、高中一、二年級家長','家長'));
 const htmlPath=path.join(output,'index.html');
 fs.writeFileSync(htmlPath,fs.readFileSync(htmlPath,'utf8').replace(/<link[^>]+senior\.css[^>]*>/g,''));
}
