const fs = require('fs');

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const list = await listRes.json();
  const page = list.find(p => p.type === 'page' && p.url.includes('3000'));
  if (!page) {
    console.error('Page not found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const { resolve, reject } = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  ws.onopen = async () => {
    try {
      console.log('Connected to CDP');
      // Set device viewport to 390x844
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });

      // Ensure mobile menu drawer is closed (click outside or ensure isMobileMenuOpen is false)
      await send('Runtime.evaluate', {
        expression: `
          const closeBtn = document.querySelector('.jerush-mobile-drawer .w-9.h-9, .jerush-mobile-drawer button[aria-label*="Close"]');
          if (closeBtn && document.querySelector('.jerush-mobile-drawer.active')) {
            closeBtn.click();
          }
        `
      });

      await new Promise(r => setTimeout(r, 600));

      // Capture screenshot of viewport
      const screenshot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: {
          x: 0,
          y: 0,
          width: 390,
          height: 150,
          scale: 2
        }
      });

      const outPath = '/Users/macbook/.gemini/antigravity-ide/brain/10194780-140a-413d-8058-ca443be27a8a/mobile_header_gap_verification.png';
      fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
      console.log('Screenshot saved to', outPath);

      // Also full mobile screen
      const fullScreenshot = await send('Page.captureScreenshot', {
        format: 'png'
      });
      const fullOutPath = '/Users/macbook/.gemini/antigravity-ide/brain/10194780-140a-413d-8058-ca443be27a8a/mobile_full_screen_gap.png';
      fs.writeFileSync(fullOutPath, Buffer.from(fullScreenshot.data, 'base64'));
      console.log('Full screenshot saved to', fullOutPath);

      ws.close();
      process.exit(0);
    } catch (e) {
      console.error('Error during CDP interaction:', e);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(console.error);
