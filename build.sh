#!/bin/sh

set -eu

BUILD="build"
CMD=${1:-}

if [ "$CMD" = "clean" ]; then
	rm -rf $BUILD
	exit 0
elif [ "$CMD" = "serve" ]; then
	if [ -f "$BUILD/.release" ]; then
		./build.sh clean
	fi
	find src/ public/ | entr -rs "jelly -i src -o $BUILD && ln -sf "$PWD/public/*" $BUILD/ && python3 -m http.server -d $BUILD 4000"
	exit 0
elif [ "$CMD" = "deploy" ]; then
	# Check if there are commits to push: https://stackoverflow.com/a/48354942/14516016
	# if git merge-base --is-ancestor HEAD @{u}; then
	# 	echo "Nothing to deploy!"
	# 	exit 1
	# fi

	./build.sh clean
	jelly -i src/ -o $BUILD
	cp -r ./public/* $BUILD/
	mkdir "$BUILD/.well-known/"
	touch "$BUILD/.release" # A "marker" to tell whether the build was created for deploying
	echo "dh=9720cdc0e4182c89303fed43db7d1ac4f0a95e1b" > "$BUILD/.well-known/discord"
	minhtml --keep-closing-tags --minify-css --minify-js --keep-spaces-between-attributes --keep-input-type-text-attr --keep-html-and-head-opening-tags $(find $BUILD -type f -name "*.html") >/dev/null # https://github.com/wilsonzlin/minify-html/
	# bunx wrangler pages deploy $BUILD --project-name 0ref --branch master --commit-dirty true --no-bundle # Deploy to Cloudflare Pages (Ensure Production Branch is Set: https://developers.cloudflare.com/pages/configuration/branch-build-controls/#production-branch-control)
	exit 0
elif [ "$CMD" = "unused" ]; then
	for filename in public/media/*; do
		if ! grep -rn $(basename $filename) --exclude-dir=.git --exclude-dir="$BUILD" > /dev/null; then
			echo "No Mention Found: $filename"
		fi
	done
	exit 0
else
	echo "Invalid command '$CMD', Available commands are: clean/serve/deploy/unused or none to just build."
	exit 1
fi
