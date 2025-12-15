import { GoogleGenAI, Chat } from "@google/genai";
import type { ProjectContext } from "../../assets/types";
import { SYSTEM_INSTRUCTION } from "../../assets/constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!genAI) {
    // Use Vite's import.meta.env instead of process.env (process is undefined in browser)
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      throw new Error(
        "VITE_API_KEY not found in .env file. Please create a .env file with VITE_API_KEY=your_gemini_key"
      );
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const initializeChat = async (): Promise<Chat> => {
  const client = getClient();

  // Create chat with system instruction
  chatSession = client.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.3, // Lower temperature for more rigorous legal adherence
    },
  });

  return chatSession;
};

const formatContextForPrompt = (context: ProjectContext): string => {
  return `
---
AKTUELL DESIGNKONTEXT (Från 3D-modell):
- Typ av åtgärd: ${context.constructionType}
- Byggnadstyp: ${context.projectType}
- Kommun: ${context.municipality}
- Plangrund: ${context.zoning}
- Byggnadshöjd: ${context.buildingHeight} m
- Avstånd till tomtgräns: ${context.distanceToBoundary} m
- BTA: ${context.grossFloorArea} kvm
- Hiss: ${context.hasElevator ? "Ja" : "Nej"}
- Tillgänglighet: ${context.isAccessible ? "Ja" : "Nej"}
- Brandklass: ${context.fireClass}
---
Användarens input:
`;
};

export const sendMessageToGemini = async (
  message: string,
  context: ProjectContext
): Promise<string> => {
  try {
    if (!chatSession) {
      await initializeChat();
    }

    if (!chatSession) throw new Error("Failed to initialize chat session");

    const fullPrompt = `${formatContextForPrompt(context)} ${message}`;

    const result = await chatSession.sendMessage({
      message: fullPrompt,
    });

    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const checkCompliance = async (
  context: ProjectContext
): Promise<string> => {
  try {
    if (!chatSession) {
      await initializeChat();
    }
    if (!chatSession) throw new Error("Failed to initialize chat session");

    const prompt = `
    ${formatContextForPrompt(context)}
    
    UPPDRAG: Utför en strikt juridisk och teknisk granskning av projektet mot svensk lagstiftning.
    
    FOKUSOMRÅDEN:
    1. **Placering & Utformning (PBL 2 kap & 8 kap):** Granska avstånd till tomtgräns och höjd. Är åtgärden lovpliktig eller anmälningspliktig?
    2. **Tillgänglighet (BBR 3):** Uppfylls kraven baserat på angiven area, hiss och våningar?
    3. **Brandskydd (BBR 5):** Är vald brandklass (${
      context.fireClass
    }) rimlig för verksamheten och storleken?
    4. **Varsamhet (om ombyggnad):** Om åtgärden är "Ombyggnad" eller "Ändring", hänvisa till varsamhetskravet.

    OUTPUT:
    Ge svaret strukturerat enligt "Output Principles" (Sammanfattning, Lagrum, Analys, Åtgärd).
    `;

    const result = await chatSession.sendMessage({
      message: prompt,
    });

    return result.text || "";
  } catch (error) {
    console.error("Compliance Check Error:", error);
    throw error;
  }
};
