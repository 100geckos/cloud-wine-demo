import sharp from 'sharp';
// Original vector artwork rendered locally for social sharing. No remote service.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#581f31"/><rect x="32" y="32" width="1136" height="566" fill="none" stroke="#bea779"/><text x="90" y="135" font-family="Georgia,serif" font-size="30" fill="#d7c29d">PIEDMONT DIGITAL · WEBSITE CONCEPT</text><text x="86" y="290" font-family="Georgia,serif" font-size="110" fill="#f6f2e9">Cloud Wine</text><text x="90" y="390" font-family="Georgia,serif" font-style="italic" font-size="60" fill="#d7c29d">Good wine. Better company.</text><text x="90" y="520" font-family="Arial,sans-serif" font-size="22" fill="#f6f2e9">Asheboro, NC · Unofficial demo · No business affiliation</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social-card.png');
console.log('Created public/social-card.png');
