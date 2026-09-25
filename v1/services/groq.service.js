import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const generarCartaPresentacionService = async (oferta, perfil) => {

    const prompt = `
Genera una carta de presentacion profesional para una postulacion laboral.

INFORMACION REAL DEL CANDIDATO:
${perfil}

OFERTA LABORAL:
${oferta}

REGLAS OBLIGATORIAS:
- Escribe la carta en español.
- Usa un tono profesional y natural.
- Utiliza exclusivamente datos que aparezcan en INFORMACION REAL DEL CANDIDATO.
- No inventes experiencia laboral.
- No inventes proyectos academicos o personales.
- No inventes estudios, habilidades, conocimientos, logros o cualidades.
- No conviertas "conocimientos en una tecnologia" en "experiencia trabajando con esa tecnologia".
- No agregues nombre, correo, telefono, direccion u otros datos que no fueron proporcionados.
- No utilices placeholders como [Nombre], [Empresa], [Correo] o similares.
- Puedes explicar por que los conocimientos proporcionados pueden ser relevantes para la oferta, pero sin afirmar experiencias que no fueron proporcionadas.
`;
    const respuesta = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "openai/gpt-oss-120b"
    });

    return respuesta.choices[0].message.content;
};