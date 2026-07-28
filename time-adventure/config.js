/* 廣運時光探險 · 集中設定（網址／時限）
 * 正式站切換：只改 SITE_BASE_URL 這一處，再重新產生 QR。
 */
const SITE_BASE_URL = "https://zxcvaden-hub.github.io/legoworks";
const GAME_BASE_PATH = "/time-adventure";
const GAME_DURATION_SECONDS = 180;

const STAGE_URLS = {
  stage1: `${SITE_BASE_URL}${GAME_BASE_PATH}/stage-1/`,
  stage2: `${SITE_BASE_URL}${GAME_BASE_PATH}/stage-2/`,
  stage3: `${SITE_BASE_URL}${GAME_BASE_PATH}/stage-3/`,
  stage4: `${SITE_BASE_URL}${GAME_BASE_PATH}/stage-4/`,
  stage5: `${SITE_BASE_URL}${GAME_BASE_PATH}/stage-5/`
};

const QR_OVERVIEW_URL = `${SITE_BASE_URL}${GAME_BASE_PATH}/qr-codes.html`;
