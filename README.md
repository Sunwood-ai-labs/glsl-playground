<p align="center">
  <img src="assets/header.svg" alt="GLSL Playground" width="800">
</p>

# 🎮 GLSL Playground

GLSLシェーダーを使った実験的なビジュアルエフェクトを試すためのプレイグラウンドです。

## 🌟 特徴

- WebGL2を使用したリアルタイムシェーダーレンダリング
- モジュール化された再利用可能なWebGLライブラリ
- 複数のシェーダーエフェクトサンプル
- プレビュー付きのサンプル選択システム

## 🚀 使い方

1. リポジトリをクローン：
```bash
git clone https://github.com/Sunwood-ai-labs/glsl-playground.git
```

2. プロジェクトディレクトリに移動：
```bash
cd glsl-playground
```

3. `index.html`をブラウザで開く

## 📁 プロジェクト構造

```
glsl-playground/
├── assets/           # 画像などの静的アセット
├── css/             # スタイルシート
├── js/              # JavaScriptファイル
│   └── lib/         # 共通ライブラリ
├── examples/        # シェーダーサンプル
│   └── rainbow-warp/  # レインボーワープエフェクト
│       ├── js/
│       └── shaders/
└── index.html       # メインページ
```

## 💡 シェーダーサンプル

### 🌈 レインボーワープ

https://github.com/user-attachments/assets/488e70eb-d39e-4fda-b4b6-f52830f847db

ワープ効果とカラフルなグラデーションを組み合わせた視覚的効果を生成します。

```glsl
// シェーダーのハイライト
for(float i = 0.0, g = 0.0, e = 0.0, s = 0.0; ++i < 85.0; o.rgb += hsv(g*i*0.1-0.5, e, s/5e2)) {
    vec3 p = vec3((FC.xy-0.5*r)/r.y+vec2(0,1.1), g+0.1);
    p.zx *= rotate2D(t*0.5);
    // ...
}
```

## 🔧 新しいサンプルの追加方法

1. `examples`ディレクトリに新しいサンプル用のディレクトリを作成
2. 以下のファイル構造に従ってファイルを作成：
   ```
   examples/your-effect/
   ├── js/
   │   └── app.js
   ├── shaders/
   │   ├── vertex.glsl
   │   └── fragment.glsl
   └── index.html
   ```
3. メインページ（`index.html`）のグリッドに新しいサンプルカードを追加
4. プレビュー用のスクリプトを追加

## 🎨 スタイルガイド

### フォント
プロジェクト全体で「Kaisei Decol」フォントを使用しています：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap" rel="stylesheet">
```

```css
body {
    font-family: "Kaisei Decol", serif;
    font-weight: 400;
    font-style: normal;
}
```

## 🛠️ 技術スタック

- WebGL2
- GLSL (OpenGL Shading Language)
- JavaScript (ES Modules)
- HTML5 & CSS3

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-effect`)
3. 変更をコミット (`git commit -am '✨ feat: 新しいエフェクトを追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-effect`)
5. プルリクエストを作成

## 📋 最近の更新

- ♻️ WebGLライブラリの共通化 (#2)
- 💄 フォントをKaisei Decolに統一 (#2)
- 🎨 サンプル選択UIの実装 (#2)

## ✨ 謝辞

このプロジェクトは、GLSLとシェーダープログラミングのコミュニティによって支えられています。
