import {examsPublished,seniorPublished} from './publication.js';
// Only remove explicitly labelled scope lines from presentation copies.
const scopeLine = /^\s*(?:預定測驗範圍|考試範圍)[：:]/;
const withoutScope = text => text.split(/\r?\n/).filter(line => !scopeLine.test(line)).join('\n');
export function publicCalendarEvent(event) {
  if(!seniorPublished && event.note) event={...event,note:event.note.replace('國高中同步開學；','').replace('、高中一、二年級家長','家長')};
  if (examsPublished) return event;
  return {
    ...event,
    ...(typeof event.note === 'string' ? {note: withoutScope(event.note)} : {}),
    ...(event.reminders ? {reminders: event.reminders.map(withoutScope).filter(Boolean)} : {})
  };
}
