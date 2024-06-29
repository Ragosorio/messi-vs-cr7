import type { APIRoute } from "astro";
import { db, User, max } from "astro:db";

export const GET: APIRoute = async ({ request }) => {
  try {
    // Obtener todos los usuarios
    const users = await db.select().from(User);

    // Obtener el máximo de la columna 'voto'
    const maxVote = await db.select({
      maxVoto: max(User.voto)
    }).from(User);

    // Obtener el máximo de la columna 'messiVotos'
    const maxMessi = await db.select({
      maxMess: max(User.messiVotos)
    }).from(User);

    // Obtener el máximo de la columna 'cristianoVotos'
    const maxRonaldo = await db.select({
      maxRonald: max(User.cristianoVotos)
    }).from(User);

    // Construir la respuesta
    const responseData = {
      numero_votos: maxVote.length > 0 ? maxVote[0].maxVoto : 0,
      numero_votos_cr7: maxRonaldo.length > 0 ? maxRonaldo[0].maxRonald : 0,
      numero_votos_messi: maxMessi.length > 0 ? maxMessi[0].maxMess : 0,
      data_usuarios: users
    };

    // Crear la respuesta HTTP con los datos en formato JSON
    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Manejar cualquier error y devolver una respuesta adecuada
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};