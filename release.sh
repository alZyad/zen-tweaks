#!/bin/sh
set -e
cd "$(dirname "$0")"

id=$(python3 -c "import json; print(json.load(open('manifest.json'))['browser_specific_settings']['gecko']['id'])")
version=$(python3 -c "import json; print(json.load(open('manifest.json'))['version'])")
base=https://alzyad.github.io/zen-tweaks

rm -rf dist
WEB_EXT_API_KEY=$(security find-generic-password -s amo-api-key -w) \
WEB_EXT_API_SECRET=$(security find-generic-password -s amo-api-secret -w) \
npx --yes web-ext@8 sign --channel=unlisted --source-dir=. --artifacts-dir=dist \
  --ignore-files docs release.sh dist .gitignore

mkdir -p docs
cp dist/*.xpi "docs/zen-tweaks-$version.xpi"
cat > docs/updates.json <<JSON
{
  "addons": {
    "$id": {
      "updates": [
        { "version": "$version", "update_link": "$base/zen-tweaks-$version.xpi" }
      ]
    }
  }
}
JSON

git add -A
git commit -qm "Release $version

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
echo "Released $version: $base/zen-tweaks-$version.xpi"
