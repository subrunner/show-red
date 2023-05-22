function renderQrcode() {
  // var content = document.getElementById("textContent").value;
  // alert("Rendering content: " + content);
  // Name abbreviated for the sake of these examples here
  const QRC = qrcodegen.QrCode;

  // Simple operation
  // const qr0 = QRC.encodeText("Hello, world!", QRC.Ecc.MEDIUM);
  const bin = [0x41, 0x6C, 0x6C, 0xA7, 0x00, 0xC3, 0xF7, 0x00, 0x03];
  const ecl = QRC.Ecc.MEDIUM;
  const qr0 = QRC.encodeBinary(bin, ecl);
  const svg = toSvgString(qr0, 4, "white", "black");  // See qrcodegen-input-demo
  console.log("SVG: ", svg);
  document.getElementById("qrcode").innerHTML = svg;

  // Manual operation
  // const segs = qrcodegen.QrSegment.makeSegments("3141592653589793238462643383");
  // const qr1 = QRC.encodeSegments(segs, QRC.Ecc.HIGH, 5, 5, 2, false);
  // for (let y = 0; y < qr1.size; y++) {
  //   for (let x = 0; x < qr1.size; x++) {
  //     // (...paint qr1.getModule(x, y) ...)
  //     console.log("module ", qr1.getModule(x, y))
  //   }
  // }
} // END renderQrcode

// Returns a string of SVG code for an image depicting the given QR Code, with the given number
// of border modules. The string always uses Unix newlines (\n), regardless of the platform.
function toSvgString(qr, border, lightColor, darkColor) {
  if (border < 0)
    throw new RangeError("Border must be non-negative");
  let parts = [];
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.getModule(x, y))
        parts.push(`M${x + border},${y + border}h1v1h-1z`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${qr.size + border * 2} ${qr.size + border * 2}" stroke="none">
<rect width="100%" height="100%" fill="${lightColor}"/>
<path d="${parts.join(" ")}" fill="${darkColor}"/>
</svg>
`;
}