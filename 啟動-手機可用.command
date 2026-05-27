#!/bin/bash
cd "$(dirname "$0")"
NODE=""
for p in /opt/homebrew/bin/node /usr/local/bin/node \
  "/Volumes/Cursor Installer/Cursor.app/Contents/Resources/app/resources/helpers/node" \
  "$(command -v node 2>/dev/null)"; do
  if [ -x "$p" ]; then NODE="$p"; break; fi
done
if [ -z "$NODE" ]; then
  osascript -e 'display alert "找不到 Node.js" message "請安裝 Node.js 18 以上：https://nodejs.org"'
  exit 1
fi
export HOST=0.0.0.0
export PORT=3780
echo "啟動中… 關閉此視窗即停止服務"
echo "手機 QR 碼頁：http://localhost:3780/qr.html"
"$NODE" server.js
