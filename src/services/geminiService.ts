import type { GenerationResponse } from '../types';
import { isValidGenerationResponse } from '../utils/validators';

const WORKER_URL = import.meta.env.VITE_WORKER_URL as string;

export async function generateReplies(prompt: string): Promise<GenerationResponse> {
  if (!WORKER_URL) {
    throw new Error('Generation service is not configured. Please set VITE_WORKER_URL.');
  }

  let response: Response;
  try {
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
  } catch {
    throw new Error('NetworkError: Unable to reach the generation service. Check your connection.');
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorBody = await response.json();
      const msg = errorBody?.error?.message ?? errorBody?.error;
      if (msg) errorMessage = String(msg);
    } catch {
      // ignore parse errors on error body
    }
    throw new Error(errorMessage);
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    throw new Error('Failed to parse the worker response as JSON.');
  }

  if (!isValidGenerationResponse(parsed)) {
    throw new Error('Response structure was unexpected. Please try again or simplify your input.');
  }

  return parsed;
}
