// Site organization ranges; boundaries must be reviewed when adding a school year.
// Summer is grouped with the incoming school year; winter break stays in the first term.
export const academicPeriods=[
 {year:'115',term:'暑期',start:'2026-07-01',end:'2026-08-30'},
 {year:'115',term:'上學期',start:'2026-08-31',end:'2027-02-10'},
 {year:'115',term:'下學期',start:'2027-02-11',end:'2027-06-30'},
];
export const overlapsPeriod=(event,period)=>event.start<=period.end&&(event.end||event.start)>=period.start;
