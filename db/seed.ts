import { db, User } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      voto: 1,
      email: "xd",
      name: "xd",
      messiVotos: 1,
      cristianoVotos: 0,
    },
	{
		voto: 2,
      email: "xd2",
      name: "xd2",
      messiVotos: 1,
      cristianoVotos: 1,
	},
  ]);
}
