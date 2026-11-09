import fs from 'node:fs';
import path from 'node:path';
import {examsPublished} from '../src/publication.js';
const root=process.cwd();
const output=path.join(root,'_site');
if(fs.existsSync(output)) throw new Error('_site already exists; use a clean staging directory.');
const hidden=new Set(['src/exams.js','src/exam-data.js','src/senior-exam-data.js','src/scope-search.js','src/exam-scopes.js']);
function copy(relative){
 if(!examsPublished && (relative==='assets/exams'||hidden.has(relative)))return;
 const source=path.join(root,relative),target=path.join(output,relative);
 if(fs.statSync(source).isDirectory()){fs.mkdirSync(target,{recursive:true});for(const name of fs.readdirSync(source))copy(relative+'/'+name);}
 else{fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target);}
}
for(const entry of ['index.html','src','assets'])copy(entry);
console.log('Prepared public site; exam archive published: '+examsPublished);
