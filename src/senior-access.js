import {seniorPublished} from './publication.js';
export {seniorPublished};
export const seniorPauseMessage='高中部資訊暫停公開，相關資訊請以學校正式公告為準。';
const senior=seniorPublished ? await import('./senior.js?v=20261109-exam-pause') : null;
export const seniorRoutes=senior?.seniorRoutes||[];
export const seniorUpdatedAt=senior?.seniorUpdatedAt||'';
export const seniorPage=path=>senior ? senior.seniorPage(path) : '<header class="page-header"><h1>'+seniorPauseMessage+'</h1></header>';
export const mountSenior=path=>senior?.mountSenior(path);
