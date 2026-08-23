# mahjong_tensu_keisanki

麻雀の符計算 / 点数早見表。

https://masa-kunikata.github.io/mahjong_tensu_keisanki/

## 開発

Vite + Vue 3 (SFC) + TypeScript。

```sh
npm install
npm run dev        # 開発サーバ
npm run typecheck  # 型チェックのみ
npm run build      # 型チェック + docs/ へビルド
npm run preview    # ビルド結果を確認
```

`npm run build` の出力先は `docs/`（GitHub Pages の公開ソース）。
**`docs/` は生成物なので直接編集しない。** 変更は `src/` に入れてビルドし直す。

## 構成

| パス | 内容 |
| --- | --- |
| `src/data.ts` | 符・点数の定数（面子、頭、待ち、満貫以上の固定点数など） |
| `src/scoring.ts` | 符と翻から点数を求める計算 |
| `src/store.ts` | アプリ全体で共有する状態と符の集計 |
| `src/types.ts` | 型定義 |
| `src/components/` | 画面（符計算パネル / 結果 / 早見表 / 固定点数表） |
| `public/legacy/` | 旧試作版。ビルド時に `docs/legacy/` へそのままコピーされる |

## 旧試作版

作り直す前の 3 バージョン（1ファイル完結・CDN 読み込み）。

- vanilla JS: https://masa-kunikata.github.io/mahjong_tensu_keisanki/legacy/index.html
- Alpine.js: https://masa-kunikata.github.io/mahjong_tensu_keisanki/legacy/alpine.html
- Vue.js (CDN): https://masa-kunikata.github.io/mahjong_tensu_keisanki/legacy/vue_3.html
