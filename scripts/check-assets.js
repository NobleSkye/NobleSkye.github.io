const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const htmlFiles = ["index.html", "home/index.html", "home/certs.html"];

let hasError = false;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf-8");
  const refs = html.match(
    /(?:src|href)=["']([^"']*\.(png|jpg|jpeg|gif|svg|ico|mp3|css|js|pdf))["']/gi,
  );

  if (!refs) continue;

  for (const ref of refs) {
    const match = ref.match(/["']([^"']+)["']/);
    if (!match) continue;
    const assetPath = match[1];

    if (
      assetPath.startsWith("http") ||
      assetPath.startsWith("//") ||
      assetPath.startsWith("mailto:") ||
      assetPath.startsWith("steam:")
    )
      continue;

    const resolved = assetPath.startsWith("/")
      ? assetPath.slice(1)
      : path.relative(
          process.cwd(),
          path.resolve(path.dirname(file), assetPath),
        );

    if (!fs.existsSync(resolved)) {
      console.error(`MISSING: ${assetPath} (referenced in ${file})`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log("All local assets found!");
}
