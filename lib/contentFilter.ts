// lib/contentFilter.ts

export interface ContentFilterResult {
  allowed: boolean;
  message?: string;
  result?: {
    confidence?: string;
    flag_reason?: string;
    found_badwords?: string[];
    has_badword?: boolean;
    is_flagged?: boolean;
    is_spam?: boolean;
    spam_probability?: number;
  };
  success?: boolean;
}

export async function checkContentWithAI(
  text: string
): Promise<ContentFilterResult> {
  try {
    const res = await fetch("http://localhost:5000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  } catch {
    return {
      allowed: false,
      message: "Unable to check content. Please try again later.",
      success: false,
    };
  }
}
