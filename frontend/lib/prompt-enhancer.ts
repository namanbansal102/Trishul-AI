export function enhancePromptWithSessionData(prompt: string, sessionData: any): string {
  if (!sessionData) return prompt

  const walletInfo = `\n\nSession Information:\n- Session ID: ${sessionData.sessionId}\n- User ID: ${sessionData.userId}\n- Wallet Public Key: ${sessionData.walletPublicKey}\n- Wallet Private Key: ${sessionData.walletPrivateKey}`

  return prompt + walletInfo
}

export function createEnhancedParts(finalPrompt: string, sessionData: any): any[] {
  const enhancedPrompt = enhancePromptWithSessionData(finalPrompt, sessionData)
  return [{ text: enhancedPrompt }]
}
