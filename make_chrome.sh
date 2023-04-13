#!/bin/bash

cp -r src chrome_extension
cp chrome_extension/chrome_manifest.json chrome_extension/manifest.json
rm -rf chrome_extension/web-ext-artifacts/
rm -r extension.zip
zip -r extension.zip chrome_extension
rm -rf chrome_extension
