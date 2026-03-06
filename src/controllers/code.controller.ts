import { Request, Response } from "express";
import { Language } from "../types";
import { LANGUAGE_MAP } from "../constants";

async function executeCode(req: Request, res: Response) {
  try {
    const { language, code } = req.body;

    const API_URL = "https://api.paiza.io/runners/create";
    
    // STEP 1: Create runner
    const createRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language: LANGUAGE_MAP[language as Language],
        api_key: "guest",
      }),
    });

    const createData = await createRes.json();

    const id = createData.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Failed to create execution",
      });
    }

    // STEP 2: Wait for execution
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // STEP 3: Get result
    const resultRes = await fetch(
      `https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`
    );

    const resultData = await resultRes.json();

    return res.json({
      success: true,
      output: resultData.stdout || resultData.stderr || "No output",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export { executeCode };