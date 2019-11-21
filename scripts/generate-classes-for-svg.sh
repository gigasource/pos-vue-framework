#!/usr/bin/env bash
STYLE_FILE_PATH="../src/style/_svg.scss"
rm $STYLE_FILE_PATH
touch $STYLE_FILE_PATH
ASSET_DIR="../src/assets"

for SVG_FILE in `find $ASSET_DIR -iregex '.*\.\svg' -type f -follow -print|xargs ls`; do
  FULL_FILENAME=$(basename -- "$SVG_FILE")
  FILENAME="${FULL_FILENAME%.*}"

  echo ".icon-$FILENAME {" >> $STYLE_FILE_PATH
  echo "  background-image: url(\"${SVG_FILE/src\/assets/assets}\");" >> $STYLE_FILE_PATH
  echo "  background-repeat: no-repeat;" >> $STYLE_FILE_PATH
  echo "  background-size: contain;" >> $STYLE_FILE_PATH
  echo "  background-position: center;" >> $STYLE_FILE_PATH
  echo "}" >> $STYLE_FILE_PATH
  echo "" >> $STYLE_FILE_PATH
done
