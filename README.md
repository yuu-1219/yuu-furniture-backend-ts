# 家具メーカECサイト（フルスクラッチ開発）

## 概要（Overview）
このWEBサイトは、ReactとNode.jsを用いて開発されたフルスクラッチのECサイトです。
商品一覧・詳細表示からカート操作、購入完了までの一連の流れを実装しました。


## 使用技術（Tech Stack）
- フロント：HTML / CSS / JavaScript(ES6) / React
- バックエンド：Node.js / Express
- データベース：MongoDB（Mongoose）
- デプロイ：AWS
- その他：Git / GitHub / Figma
  

## 想定ユーザー（Target User）
- 一般ユーザー：家具等を購入するエンドユーザー
  

## ページ構成（Page Structure）
| URL                       | ページ名             | 機能概要                               |
| ------------------------- | -------------------- | -------------------------------------- |
| `/`                       | トップページ         | カテゴリ検索機能・全体への導線表示     |
| `/products`               | 商品一覧ページ       | 並べ替え・絞り込み機能あり             |
| `/products/:id`           | 商品詳細ページ       | 商品情報・カート追加機能               |
| `/cart`                   | カートページ         | 商品削除/追加・合計金額表示・購入機能  |
| `/complete`               | 購入完了ページ       | サンクスメッセージ・注文情報表示       |
| `/login`                  | ログインページ       | モック認証対応                         |
| `/register`               | 会員登録ページ       | 入力フォームのみ                       |
| `/user/:id`               | 会員ページ           | 注文履歴・会員情報変更・お気に入り一覧 |
| `/user/:id/order-history` | 購入履歴ページ       | 購入履歴（モック）                     |
| `/user/:id/info`          | 会員情報変更ページ   | 会員情報の確認・変更                   |
| `/user/:id/favorite`      | お気に入り一覧ページ | お気に入り商品の一覧                   |


## 機能一覧（Feature List）
- 商品一覧表示（並べ替え・検索機能つき）
- 商品詳細表示
- カート追加・削除・合計計算（localStorage連携）
- 購入完了表示
- 会員登録・ログイン（簡易モック）
- 管理者による商品登録フォーム


## API設計（API Design）
| メソッド | エンドポイント    | 機能                                         |
| -------- | ----------------- | -------------------------------------------- |
| GET      | /api/products     | 商品一覧取得（検索・並べ替え・絞り込み対応） |
| GET      | /api/products/:id | 商品詳細取得                                 |
| POST     | /api/cart         | カートに商品追加                             |
| DELETE   | /api/cart/:id     | 商品削除                                     |
| POST     | /api/products     | 商品新規登録（管理者用）                     |


## ワイヤーフレーム （Wire Frame）

[ワイヤーフレーム] (https://www.figma.com/design/30LztBXcfurCCVYbY2Gd4N/EC%E3%82%B5%E3%82%A4%E3%83%88?node-id=0-1&p=f&t=CpqCrY3IRumavmW0-0)

Figmaで作成したECサイトのワイヤーフレームにリンクしております。


## データ構造（Data Model）

```json
// Product
{
  "productId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Wooden Cup",
  "price": 2500,
  "img": "/img/cup.png",
  "description": "Handmade cup",
  "color": "white",
  "stock": 20,
  "category": "strage_furniture",
  "rating": 4.5
}

// Cart
{
  "cartId": "c8b21c0e-5a74-4e67-88f5-2e13ef8300d9",
  "userId": "a3f1e6b8-cc4b-4c1d-b4c7-fb9e92afab2e",
  "items": [
    {
      "productId": "e17f1c72-45be-4bbf-a978-25bd51c0a1b5",
      "quantity": 2,
      "color": "white"
    },
    {
      "productId": "7d0296b1-5e4d-47e1-8413-1027b5e7d8f9",
      "quantity": 1,
      "color": "black"
    }
  ],
  "totalQty": 3,
  "totalPrice": 35400,
  "updatedAt": "2025-05-18T14:32:00Z"
}

// User
{
  "userId": "u001",
  "name": "Taro",
  "email": "taro@example.com",
  "password": "taro8",
  "orders": [
    {
      "orderId": "20250508-0234",
      "items": [
        {
          "productId": "p001",
          "quantity": 2,
          "color": "black"
        },
        {
          "productId": "p005",
          "quantity": 1,
          "color": "white"
        }
      ],
      "totalQty": 3,
      "totalPrice": 8800,
      "purchasedAt": "2024-05-08T15:23:00Z"
    },
  ],
  "favorites": [
    { 
      "productId": "p001",
    　"color": "black"
    },
    {
      "productId": "p005", 
      "color": "white"
     },
  ]
//   "orderHistory": [{ "orderId": "20250508-0234", "orderId": "20250510-1234" }]
}

//OrderHistory
// {
//   "userId": "u001",
//   "orders": [
//     {
//       "orderId": "20250508-0234",
//       "items": [
//         {
//           "productId": "p001",
//           "quantity": 2,
//           "color": "black"
//         },
//         {
//           "productId": "p005",
//           "quantity": 1,
//           "color": "white"
//         }
//       ],
//       "totalQty": 3,
//       "totalPrice": 8800,
//       "purchasedAt": "2024-05-08T15:23:00Z"
//     },
//   ]
// }

