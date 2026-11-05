# Minimal Editorial Site — Astro + GitHub Pages

白・黒・グレー、Zen Old Mincho、余白と1pxの罫線を基本にした静的サイトのスターターです。

## 必要なもの

- GitHubアカウント
- （任意）GitHub Desktop。GitHubのブラウザ画面だけでもファイルを追加・編集できます。

**ローカルにNode.jsやnpmをインストールする必要はありません。** このプロジェクトはGitHub Actions上で依存関係のインストール、Astroのビルド、Pagefindの検索インデックス生成、GitHub Pagesへの公開を行います。

## 1. 公開先を設定

`astro.config.mjs` の次の2項目を編集します。

```js
const site = 'https://YOUR-USERNAME.github.io';
const base = '/YOUR-REPOSITORY';
```

- 通常のリポジトリサイト: `site` は `https://ユーザー名.github.io`、`base` は `/リポジトリ名`
- `ユーザー名.github.io` リポジトリ: `base` は空文字 `''`
- 独自ドメイン: `site` を独自ドメインにし、`base` は空文字 `''`

## 2. GitHub Pagesへ公開（Node.js不要）

1. GitHubで新しいリポジトリを作成します。
2. このプロジェクトのファイル一式をリポジトリのルートに配置します。フォルダ構成、特に `.github/workflows/` を維持してください。GitHub Desktopを使う場合は、プロジェクトフォルダをリポジトリとして開いてコミット・pushします。ブラウザだけで作業する場合は、GitHubのファイル追加機能でアップロードできます。
3. `astro.config.mjs` と `src/config/site.ts` のサイト情報を設定し、`main` ブランチに反映します。
4. GitHubの `Settings` → `Pages` → `Build and deployment` → `Source` を `GitHub Actions` に設定します。
5. `Actions` タブで `Deploy to GitHub Pages` の実行結果を確認します。成功すると公開されます。

`.github/workflows/deploy.yml` では、GitHub Actions上でNode.js 24を準備し、`npm install` と `npm run build` を実行します。その後、生成された `dist/` をGitHub Pagesへデプロイします。手元でNode.jsを導入したり、npmコマンドを実行したり、`package-lock.json` を生成したりする必要はありません。依存関係のインストール結果はGitHub Actionsの実行環境内だけで利用されます。

## 3. （任意）ローカルでプレビュー

編集結果を手元で確認したい場合だけ、Node.js 24とnpmを導入し、次のコマンドを実行してください。これは必須ではありません。

```bash
npm install
npm run dev
```

本番ビルドとPagefind検索の確認は `npm run build` の後に `npm run preview` で行えます。

## 4. サイト名・ナビゲーション・SNS

`src/config/site.ts` を編集します。

- `name`: ヘッダー・フッターのサイト名
- `title` / `description`: サイトの基本情報
- `navigation`: グローバルナビゲーション
- `social`: Facebook / Instagram / X / note のURL。空欄のSNSは表示されません。

## 5. ブログ記事を追加

`src/content/blog/` にMarkdownファイルを追加します。ファイル名がURLの一部になります。

```md
---
title: 記事タイトル
description: 検索結果などに表示する概要
pubDate: 2026-11-05
category: 日々の記録
categorySlug: daily
tags:
  - 日記
---

## 見出し

本文をMarkdownで書きます。
```

`draft: true` を設定すると公開一覧や生成ページから除外します。記事の追加に応じてブログ一覧、年月別アーカイブ、カテゴリ別ページが自動生成されます。

記事ページの目次は、Markdown本文の第2階層見出し（`##`）から自動生成されます。

## 6. ギャラリー画像を追加

1. 画像を `public/images/gallery/` に置く。
2. `src/data/gallery.ts` の `galleryItems` にタイトル・説明・画像パス・altを追加。

画像はWebPまたはAVIFを推奨します。幅は表示サイズに合わせて調整し、altには画像内容を簡潔に記述してください。

## 7. 汎用ページとパーツ

`src/pages/page.astro` が汎用ページ兼パーツ見本です。共通パーツは `src/components/` にあります。

- `LinkButton.astro`: テキストリンク
- `ImageLink.astro`: 画像付きリンク
- `Carousel.astro`: CSSスクロールスナップ式カルーセル
- `Toc.astro`: 目次
- `SocialLinks.astro`: SNSリンク
- `Accordion.astro`: HTML標準のdetails/summary
- `Tabs.astro`: キーボード操作対応タブ
- `Breadcrumbs.astro`: パンくずリスト
- `BlogSidebar.astro`: 年月別・カテゴリ別サイドバー

## 8. デザインをまとめて変更

`src/styles/global.css` の先頭にあるCSS変数を編集します。背景・文字色・罫線・本文幅・余白・文字サイズをここで一括管理します。

Zen Old Mincho はGoogle Fontsから読み込みます。フォントの読み込みに失敗した場合はOS標準の明朝体にフォールバックします。

## 9. SEO

- ページ別 title / description
- canonical URL
- OGP / Twitter Card
- sitemap.xml（Astro Sitemap）
- robots.txt
- semantic HTML / lang="ja"
- 画像のalt属性
- ブログ記事の静的HTML生成

公開後はGoogle Search Consoleにサイトを登録し、サイトマップURL (`sitemap-index.xml`) を送信してください。

## 注意

GitHub Pagesは静的ホスティングです。サーバー側のフォーム送信、ログイン、データベース、管理画面などは標準では動きません。必要になった場合は外部サービスと連携します。
