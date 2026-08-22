#!/bin/sh
# Bundle a TS eval and run it from the project root.
# Node's type stripping needs explicit .ts extensions; the app uses bundler
# resolution, so the two disagree. esbuild resolves it and costs ~30ms.
set -e
out=".evalbuild/$(basename "$1" .ts).mjs"
npx esbuild "$1" --bundle --platform=node --format=esm --outfile="$out" --log-level=error
shift
node "$out" "$@"
