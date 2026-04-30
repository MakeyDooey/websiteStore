// AI Hardware Recommender
const HARDWARE_CONTEXT = `
You are MakeyDooey's hardware recommendation AI. MakeyDooey is a modular embedded hardware platform.

Our available boards:
- Main Totem: STM32H755 Nucleo, dual-core 480MHz, FreeRTOS, UART bus host, command router for all other totems. Use for: any project needing a powerful central controller, PID control, real-time tasks, or communication hub.
- Motor Totem: ESP32-S3, drives up to 5 NEMA17 stepper motors (TMC2209 with stallguard sensorless homing) plus DC motors (DRV8871). Use for: robotics, CNC, prosthetics, any project with motor control.
- ShamanLink: Custom PCB with LPC55S69, provides USB-C to CMSIS-DAP bridge, SWD programming, and CAN bus between totems. Use for: any project that needs the full system connected to a computer for flashing/debugging.
- PWA IDE: Free browser-based IDE (no install). Flash firmware, monitor serial, control hardware from Chrome or Edge.

Recommend ONLY our boards above. Be specific about which boards are needed and why. Be concise - 3-5 sentences. Format as: first state the recommended boards in bold, then explain why each is needed. End with one encouraging sentence about what they can build.
    `.trim();

export async function getRecommendation() {
  const input = document.getElementById('idea-input').value.trim();
  if (!input) return;

  const btn = document.getElementById('send-btn');
  const responseDiv = document.getElementById('recommender-response');
  const responseText = document.getElementById('response-text');

  btn.disabled = true;
  responseDiv.classList.add('visible');
  responseText.innerHTML = `<div class="thinking">Thinking<span class="thinking-dots"><span></span><span></span><span></span></span></div>`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: HARDWARE_CONTEXT,
        messages: [{ role: 'user', content: input }]
      })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || 'Sorry, could not generate a recommendation. Please try again.';

    // Simple bold markdown -> HTML
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    responseText.innerHTML = formatted;
  } catch (err) {
    responseText.innerHTML = 'Network error - please try again.';
  } finally {
    btn.disabled = false;
  }
}

// Initialize recommender event listeners
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const ideaInput = document.getElementById('idea-input');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', getRecommendation);
  }
  
  if (ideaInput) {
    // Allow Enter+Shift for newline, Enter alone to submit
    ideaInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        getRecommendation();
      }
    });
  }
});
