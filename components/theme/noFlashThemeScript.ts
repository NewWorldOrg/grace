/**
 * テーマ設定が `system`（Cookie 未設定または `system`）のとき、SSR では
 * `prefers-color-scheme` を読めないため、hydration 前にこのインラインスクリプトで
 * `dark` クラスを適用する。「ライトで描画→mount 後にダークへ切替」のちらつき防止。
 * 明示的な light/dark が選択されていない場合のみ layout が注入する。
 *
 * 内容はユーザー入力を含まない定数文字列のため XSS リスクはない。
 */
export const NO_FLASH_THEME_SCRIPT = `
(function(){
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } catch (_) {}
})();
`
