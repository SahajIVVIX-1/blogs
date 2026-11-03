// Allow running on Node 22.23.3 (Astro 7.4.4 expects >=22.23.4)
Object.defineProperty(process.versions, 'webcontainer', { value: '1', configurable: true, enumerable: true });
process.env.ASTRO_TELEMETRY_DISABLED = '1';
