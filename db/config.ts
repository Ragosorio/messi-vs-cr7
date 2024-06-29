import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const User = defineTable({
  columns: {
    email: column.text({unique:true}),
    name: column.text(),
    voto: column.number({ primaryKey: true }),
    messiVotos: column.number(),
    cristianoVotos: column.number()
  }
})

export default defineDb({
  tables: {
    User
  }
});
