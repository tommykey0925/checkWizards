# Check Wizards

Vue 3 と Angular 17 の学習用プロジェクトです。
同じ題材（Harry Potter API からウィザード情報を取得・表示）を両フレームワークで実装し、設計思想やコードの書き方の違いを比較できます。

## Demo

GitHub Pages にデプロイ済み:
**https://tommykey0925.github.io/checkWizards/**

- [Vue 3 版](https://tommykey0925.github.io/checkWizards/vue/)
- [Angular 17 版](https://tommykey0925.github.io/checkWizards/angular/)

> GitHub リポジトリの Settings → Pages で Source を **GitHub Actions** に設定してください。
> `main` ブランチに push すると自動デプロイされます。

## Quick Start

```bash
# 依存関係を一括インストール
pnpm run install:all

# Vue アプリを起動 → http://localhost:5173
pnpm run dev:vue

# Angular アプリを起動 → http://localhost:4200
pnpm run dev:angular
```

## プロジェクト構成

| ディレクトリ | フレームワーク | 状態管理 | HTTP通信 | ビルドツール |
|---|---|---|---|---|
| `ilovebeer/` | Vue 3 + TypeScript | Pinia (Composition API) | axios | Vite |
| `ilovewisky/` | Angular 17 + TypeScript | Service (DI) | HttpClient (RxJS) | Angular CLI |

## 学習ポイント

### Vue 3 (`ilovebeer/`)

| テーマ | 該当ファイル |
|---|---|
| Composition API (`<script setup>`) | `src/App.vue`, `src/views/WizardView.vue` |
| Pinia によるストア管理 | `src/stores/wizard.ts` |
| Vue Router | `src/router/index.ts` |
| リアクティブ (ref, computed) | `src/views/WizardView.vue` |
| axios による HTTP 通信 | `src/stores/wizard.ts` |

### Angular 17 (`ilovewisky/`)

| テーマ | 該当ファイル |
|---|---|
| Standalone Components | `src/app/wizard/wizard.component.ts` |
| Service と DI (Dependency Injection) | `src/app/gryffindor.service.ts` |
| HttpClient + RxJS (firstValueFrom, timeout) | `src/app/gryffindor.service.ts` |
| Angular Router | `src/app/app.routes.ts` |
| テンプレート構文 (`*ngIf`, バインディング) | `src/app/wizard/wizard.component.html` |

### フレームワーク比較

| 観点 | Vue 3 | Angular 17 |
|---|---|---|
| コンポーネント定義 | `.vue` SFC (Single File Component) | デコレータ `@Component` |
| 状態管理 | Pinia ストア (`defineStore`) | Injectable Service |
| HTTP 通信 | axios (Promise ベース) | HttpClient (Observable → firstValueFrom) |
| テンプレート分岐 | `v-if` / `v-else` | `*ngIf` |
| データバインディング | `:attr` / `{{ }}` | `[attr]` / `{{ }}` |
| ルーティング | `<RouterLink>` / `<RouterView>` | `routerLink` / `<router-outlet>` |
| ビルド | Vite (高速 HMR) | Angular CLI (esbuild) |

## API について

[Harry Potter API](https://hp-api.onrender.com/api/characters) からキャラクター情報を取得しています。
API にアクセスできない環境ではフォールバックデータが表示されます。
