import { type APIRoute } from "astro";
import { db, User, max, eq} from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, vote } = body;

  // Verificar si ya existe un usuario con el mismo correo electrónico
  const existingUser = await db.select().from(User).where(eq(User.email, email)).execute();

  if (existingUser.length > 0) {
    return new Response(JSON.stringify({
      message: "El correo electrónico ya está registrado."
    }), { status: 400 });
  }

  // Verificar si la tabla User tiene datos
  const users = await db.select().from(User);
  console.log("Usuarios actuales:", users);

  if (users.length === 0) {
    // Si no hay datos, insertar el primer registro
    await db.insert(User).values({
      voto: 1,
      email: email,
      name: name,
      messiVotos: vote === "Messi" ? 1 : 0,
      cristianoVotos: vote === "Ronaldo" ? 1 : 0
    });

    console.log("Primer usuario creado.");
  } else {
    // Seleccionar el número más grande de voto
    const recentUser = await db.select({
      maxVoto: max(User.voto)
    }).from(User);

    const recentMessi = await db.select({
      maxMessi: max(User.messiVotos)
    }).from(User);

    const recentRonaldo = await db.select({
      maxRonaldo: max(User.cristianoVotos)
    }).from(User);

    // Insertar el nuevo voto
    await db.insert(User).values({
      voto: (recentUser[0]?.maxVoto || 0) + 1,
      email: email,
      name: name,
      messiVotos: vote === "Messi" ? (recentMessi[0]?.maxMessi || 0) + 1 : (recentMessi[0]?.maxMessi || 0),
      cristianoVotos: vote === "Ronaldo" ? (recentRonaldo[0]?.maxRonaldo || 0) + 1 : (recentRonaldo[0]?.maxRonaldo || 0)
    });

    console.log("Nuevo usuario creado con voto:", (recentUser[0]?.maxVoto || 0) + 1);
  }

  return new Response(JSON.stringify({
    message: "Voto registrado correctamente."
  }));
};