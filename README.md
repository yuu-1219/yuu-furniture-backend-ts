# 家具メーカECサイト（フルスクラッチ開発）

## 概要（Overview）
家具メーカーを想定したBtoC向けECサイトを、フロントエンドからバックエンドまでフルスクラッチで開発しました。
TypeScript(React) + Node.js + MongoDBで構成し、商品閲覧からカート操作・購入・会員情報管理までの基本的機能を備えております。

## 今後の改善予定
- Next.jsへの対応
- jestによるテスト導入
- AIによるレコメンド機能・お問い合わせ自動回答機能の導入
- 画面別のローディング表示最適化
- 全体的なUI/UXの改善

本ポートフォリオは、UI設計・React/MUI構築・API接続・ユーザー状態管理を中心に開発しました。
今後も継続的に改善してまいります。

## 公開URL
- ECサイト: [https://yuu-furniture.com](https://yuu-furniture.com)
- フロントエンド: [yuu-furniture-frontend-ts](https://github.com/yuu-1219/yuu-furniture-frontend-ts)
- バックエンド: [yuu-furniture-backend-ts](https://github.com/yuu-1219/yuu-furniture-backend-ts)


## 使用技術（Tech Stack）
- フロント：HTML / CSS / TypeScript / React(Material UI含む)
- バックエンド：Node.js / Express
- データベース：MongoDB（Mongoose, Atlas）
- デプロイ：AWS(EC2, ALB, WAF, Route53, S3)
- その他：Git / GitHub
  

## 想定ユーザー（Target User）
- 一般ユーザー：家具等を購入するエンドユーザー
  

## ページ構成（Page Structure）
| URL                       | ページ名           　  | 機能概要                             　　|
| ------------------------- | -------------------- | -------------------------------------- |
| `/`                       | トップページ           | メイン画面表示・カテゴリ検索機能　　　　　　   |
| `/products`               | 商品一覧ページ         | 商品一覧データ表示(並べ替え、絞り込み機能)     |
| `/products/register`      | 商品情報登録ページ      | 商品情報登録                              |
| `/products/:id`           | 商品詳細ページ         | 商品情報・カート機能・お気に入り追加／削除機能 |
| `/cart`                   | カートページ           | 商品削除/追加・合計金額表示・購入処理(仮実装)  |
| `/complete`               | 購入完了ページ         | サンクスメッセージ表示・注文情報表示          |
| `/login`                  | ログインページ         | モック認証対応                             |
| `/user/register`          | 会員登録ページ         | 会員情報登録                              |
| `/user/:id`               | 会員ページ             | 注文履歴・会員情報変更・お気に入りリスト      |
| `/user/:id/order-history` | 購入履歴ページ         | 注文履歴表示                     　　　    |
| `/user/:id/favorite`      | お気に入り一覧ページ    | お気に入りリストの表示                      |
| `/user/:id/info`          | 会員情報変更ページ      | 会員情報の確認・変更                       |
| `/user/:id/password`      | パスワード変更ページ    | パスワードの変更 　　                      |



## 機能一覧（Feature List）
- 商品一覧表示(並べ替え、絞り込み、検索機能)
- 商品詳細表示・お気に入り機能
- カート追加・削除・合計計算
- 購入完了表示・購入完了メール送信
- 会員登録・ログイン・ログアウト（簡易モック）
- 会員情報の変更
- 注文履歴の表示
- お気に入り商品リストの表示
- 管理者による商品登録フォーム
  
### ※商品一覧表示における検索・絞り込み・並べ替え機能について

`/products` ページでは、以下のような検索・絞り込み・並べ替えに対応しております。

#### 【クエリパラメータによる検索】
- `category`：カテゴリ指定によるフィルター  
  例）`/products?category=storage_furniture`
- `search`：検索キーワードによるフィルター  
  例）`/products?search=収納`
- 複合指定：  
  例）`/products?category=storage_furniture&search=収納`

#### 【ページ上での絞り込み機能】
- `カラー`：チェックボックスで複数選択可能
- `価格`：5,000円〜9,999円、10,000円〜14,999円 などの価格帯を複数選択可能
- 商品データ取得時に上記データをボディに含め、バックエンドより絞り込みされたデータを取得

#### 【並べ替え機能】
- 表示順を以下のいずれかに変更可能
  - 価格の安い順(デフォルト)
  - 価格の高い順
  - 評価の高い順


## API設計（API Design）
| メソッド  | エンドポイント       | 機能                                         |
| -------- | ----------------- | -------------------------------------------- |
| GET      | /api/products     | 商品一覧データ取得　　　　　　　　　　　　　　　　    |
| GET      | /api/products/:id | 商品詳細データ取得                              |
| POST     | /api/products     | 商品データ登録                                 |
| PUT      | /api/products/:id | 商品データ更新                                 |
| DELETE   | /api/products/:id | 商品データ削除                                 |
| GET      | /api/cart/:id     | ユーザーのカートデータを取得                      |
| POST     | /api/cart         | カートデータを登録                              |
| PUT      | /api/cart/:id     | ユーザーのカートデータを更新                      |
| DELETE   | /api/cart/:id     | ユーザーのカートデータを削除                      |
| GET      | /api/user/:id     | ユーザーデータを取得                            |
| POST     | /api/user         | ユーザーデータを登録                            |
| POST     | /api/user/login   | ログイン処理                                   |
| PUT      | /api/user/:id     | ユーザーデータを更新                            |
| DELETE   | /api/user/:id     | ユーザーデータを削除                            |


## ワイヤーフレーム （Wire Frame）

[ワイヤーフレーム](https://www.figma.com/design/30LztBXcfurCCVYbY2Gd4N/EC%E3%82%B5%E3%82%A4%E3%83%88?node-id=0-1&p=f&t=CpqCrY3IRumavmW0-0)

Figmaで作成したECサイトのワイヤーフレームにリンクしております。


## データ構造（Data Model）

```json
// Product
{
  "_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "収納家具6",
  "price": 5500,
  "image": "https://yuu-furniture-imgs.s3.ap-northeast-1.amazonaws.com/products/storage_furniture/storage_furniture6.jpg", 
  "description": "アパートの一室やゲストルームを素早く簡単に整えられます。同じシリーズのベッドサイドテーブル、ベッド、ワードローブを組み合わせると統一感が出ます",
  "color": "ブラウン",
  "stock": 20,
  "category": "storage_furniture",
  "rating": 5.0
}

// Cart
{
  "_id": "c8b21c0e-5a74-4e67-88f5-2e13ef8300d9",
  "userId": "c8b21c0e-5a74-4e67-88f5-2e13ef8300e9",
  "items": [
    {
      "productId": "e17f1c72-45be-4bbf-a978-25bd51c0a1b5",
      "quantity": 2,
      "color": "ホワイト"
    },
    {
      "productId": "7d0296b1-5e4d-47e1-8413-1027b5e7d8f9",
      "quantity": 1,
      "color": "ブラック"
    }
  ],
  "totalQty": 3,
  "totalPrice": 35250,
  "updatedAt": "2025-05-18T14:32:00Z"
}

// User
{
  "_id": "c8b21c0e-5a74-4e67-88f5-2e13ef8300e9",
  "name": "yuu",
  "email": "yuu@gmail.com",
  "password": "（ローカルで生成されたパスワードをハッシュ化し、DBへ格納）",
  "orders": [
    {
      "orderId": "20250508-0234",
      "items": [
        {
          "productId": "550e8400-e29b-41d4-a716-446655440000",
          "quantity": 2,
          "color": "ブラック"
        },
        {
          "productId": "550e8400-e29b-41d4-a716-446655445550",
          "quantity": 1,
          "color": "ホワイト"
        }
      ],
      "totalQty": 3,
      "totalPrice": 8250,
      "purchasedAt": "2024-05-08T15:23:00Z"
    },
  ],
  "favorites": [
    { 
      "productId": "550e8400-e29b-41d4-a716-446655440000",
      "color": "ブラック"
    },
    {
      "productId": "550e8400-e29b-41d4-a716-446655445550", 
      "color": "ホワイト"
     },
  ]
}

