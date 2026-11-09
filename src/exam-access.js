import {examsPublished} from './publication.js';
export {examsPublished};
const archive = examsPublished ? await import('./exams.js?v=20261104-advance') : null;
export const seniorExamFiles = examsPublished ? (await import('./senior-exam-data.js?v=20261106-trip-note')).seniorExamFiles : [];
export const examLink = event => archive ? archive.examLink(event) : '';
export function mountExams(host, config) {
 if (archive) return archive.mountExams(host, config);
 host.innerHTML = '<header class="page-header"><h1>考程暫停公開</h1><p>一般考試日期與日常提醒仍可至行事曆查詢。</p></header>';
}
