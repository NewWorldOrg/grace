/**
 * Strip the Next.js version string from client chunks after build.
 *
 * The Next.js client runtime embeds `window.next={version:"X.Y.Z",...}` into
 * a served chunk, which lets fingerprinting tools (Wappalyzer etc.) read the
 * exact framework version. There is no official config to disable this
 * (vercel/next.js#72471), so we blank the version post-build.
 *
 * The replacement is padded to the original length so Sentry source maps
 * uploaded during the build stay position-accurate.
 */
const fs = require('fs')
const path = require('path')

const { version } = require('next/package.json')

// window.next={version:"X.Y.Z"} (Next.js client runtime) and
// globalThis._sentryNextJsVersion="X.Y.Z" (@sentry/nextjs) both leak the
// exact version to the browser. Blank each, padded to the original length.
const needles = [`version:"${version}"`, `_sentryNextJsVersion="${version}"`]
const replacementFor = (needle) =>
  needle.replace(`"${version}"`, '""').padEnd(needle.length, ' ')

const chunksDir = path.join(__dirname, '..', '.next', 'static', 'chunks')

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.js') ? [full] : []
  })
}

let patched = 0
for (const file of walk(chunksDir)) {
  let src = fs.readFileSync(file, 'utf8')
  let touched = false
  for (const needle of needles) {
    if (!src.includes(needle)) continue
    src = src.split(needle).join(replacementFor(needle))
    touched = true
  }
  if (!touched) continue
  fs.writeFileSync(file, src)
  patched++
}

if (patched === 0) {
  console.warn(
    `[strip-next-version] no chunk contained the version string — check whether the embed pattern changed`,
  )
} else {
  console.log(`[strip-next-version] blanked next version in ${patched} chunk(s)`)
}
