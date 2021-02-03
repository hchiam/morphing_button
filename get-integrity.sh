function sha() {
  tempShaOutput=$(cat $1 | openssl dgst -sha384 -binary | openssl base64 -A)
  echo sha384-$tempShaOutput
}

# uncomment the following lines:

echo
echo morphing_button.js
sha morphing_button.js
echo
