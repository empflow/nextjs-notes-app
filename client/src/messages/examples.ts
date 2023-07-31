/*
  // ICU argument consists of 3 components: `name`, `type (base formatting type)`, `format`

  // select
  "message": "{gender, select, male {He} female {She} other {They} } will respond asap"

  // currency
  "message": "This costs { price, number, ::sign compact-short currency/USD }"
  // example above doesn't work with  all currencies (only tested on RUB), so below is probably a better alternative, not sure
  "message": "This costs ₽{ price, number }

  // numbers (endings like st, nd, rd, th)
  "message": "This is your { year, selectordinal, one {#st} two {#nd} few {#rd} other {#th} }"

  // normal numbers
  "message": "The number is {num}"
*/

export {};
