import { sql } from 'drizzle-orm';

export function buildJsonbObject(
  record: Record<string, unknown> | null | undefined,
) {
  if (!record || Object.keys(record).length === 0) {
    return sql.raw(`'{}'::jsonb`);
  }

  return sql.raw(`'${JSON.stringify(record)}'::jsonb`);

  // function build(toBuild: Record<string, unknown> | null | undefined) {
  //   if (!toBuild || Object.keys(toBuild).length === 0) {
  //     return `'{}'::jsonb`;
  //   }

  //   return

  //   const keyValuePairs = Object.entries(toBuild).map(([key, value]) => {
  //     let valueString: string;
  //     if (Array.isArray(value)) {
  //       valueString = `to_jsonb('${JSON.stringify(value)}'::text)`;
  //     } else if (value === null || value === undefined) {
  //       valueString = 'null';
  //     } else if (typeof value === 'object') {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       valueString = build(value as any);
  //     } else {
  //       valueString = `'${value}'`;
  //     }
  //     return `'${key}', ${valueString}`;
  //   });

  //   console.log({ sql: `jsonb_build_object(${keyValuePairs.join(', ')})` });

  //   return `jsonb_build_object(${keyValuePairs.join(', ')})`;
  // }

  // return sql.raw(build(record));
}

// export function buildJsonbObject(
//   record: Record<string, unknown> | null | undefined,
// ) {
//   if (!record || Object.keys(record).length === 0) {
//     return sql.raw('jsonb_build_object()');
//   }

//   const stringified = JSON.stringify(record);

//   console.log({ stringified });

//   return sql.raw(`to_jsonb('${stringified}'::text)::jsonb`);

//   // const keyValuePairs = Object.entries(record).map(([key, value]) => {
//   //   let valueString;
//   //   if (Array.isArray(value)) {
//   //     valueString = `to_jsonb(${JSON.stringify(value)}::json)`;
//   //   } else if (value === null || value === undefined) {
//   //     valueString = 'null';
//   //   } else if (typeof value === 'object') {
//   //     valueString = `to_jsonb('${JSON.stringify(value)}')`;
//   //   } else {
//   //     valueString = `to_jsonb(${JSON.stringify(value)}::text)`;
//   //   }
//   //   return `'${key}', ${valueString}`;
//   // });

//   // return sql.raw(`jsonb_build_object(${keyValuePairs.join(', ')})`);
// }
