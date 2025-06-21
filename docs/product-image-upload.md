# 商品画像アップロード機能 詳細設計書

## 1. 機能概要・目的
家具メーカー向けECサイトにおいて、商品管理者が管理画面から商品情報を登録する際、商品画像も併せて登録可能にする。
商品画像はS3に格納し、その他商品情報は、画像URLを含めてデータベースに保存。
登録された商品は、商品一覧ページ・商品詳細ページで確認可能。

## 2. システム構成
- フロントエンド: TypeScript(React)
- バックエンド: Node.js / Express / Mongoose / Multer
- データベース: MongoDB (Atlas)
- ファイルストレージ: AWS (S3)
- ホスティング: AWS (EC2, ALB, Route53など)

## 3. アップロード対象
- 対象: 商品画像（商品1件につき1ファイル）
- ファイル形式: JPEG

## 4. APIエンドポイント
| メソッド  | エンドポイント            | 説明                                   |
| -------- | ---------------------- | -------------------------------------- |
| POST     | /api/products/register | `商品データ登録・画像ファイルアップロード`   |
| POST     | /api/products          | 商品一覧データ取得(絞り込み機能あり)        |
| GET      | /api/products/:id      | 商品詳細データ取得                        |


## 5. フロントエンド処理設計

### 5.1. メイン画面構成
- 商品情報登録画面: "/products/register" 
- ページコンポーネント: RegisterProduct 
- 構造:    
  - ページコンポーネント (RegisterProduct)
    - 入力コンポーネント群（ProductNameForm, `ProductImgForm`, ...）  
    - RunButton（商品情報登録ボタン）   

### 5.2. サブコンポーネント
- ProductNameForm: 商品名入力フォーム（input type="string"）
- `ProductImgForm`: 画像アップロードフォーム（input type="file"）
- PriceForm: 価格入力フォーム（input type="number"）
- ColorForm: カラー選択フォーム（select）
- DescriptionForm: 商品説明入力フォーム（input type="string"）
- StockForm: 在庫数入力フォーム（input type="number"）
- CategoryForm: カテゴリ選択フォーム（select）
- RatingForm: 評価入力フォーム（input type="number"）
- RunButton: 商品情報登録ボタン

### 5.3. ステート管理
```typescript
const [productName, setProductName] = useState<string>("");
const [productImg, setProductImg] = useState<File | null>(null);
const [price, setPrice] = useState<number | null>(null);
const [description, setDescription] = useState<string>("");
const [color, setColor] = useState<string>("");
const [stock, setStock] = useState<number | null>(null);
const [category, setCategory] = useState<string>("");
const [rating, setRating] = useState<number | null>(null);
```

### 5.4. 操作フロー
1. ユーザーが商品データを入力
2. 各商品データをそれぞれのステートに保持
3. ユーザーが「登録する」ボタンを押下（onClickイベント発生）
4. FormDataを生成し、商品情報 + 画像ファイルを追加
5. axiosを用いて POST /api/products/register APIを実行 (ヘッダー: {Content-type: multipart/form-data}, ボディ: FormData)


### 5.5. コード例
```typescript
export default function RegisterPruduct() {
    //ステート管理
    const [productName, setProductName] = useState<string>("");
    const [productImg, setProductImg] = useState<File | null>(null);
    ...

    //登録ボタン押下時の処理メソッド
    const handleRegisterProduct = async () => {
         if (productName.trim() === "") {
            alert("商品名を入力してください");
            setProductName("");
            return;
        }
        if (productImg === null) {
            alert("商品画像を添付してください");
            setProductImg(null);
            return;
        }
        ...

        const formData = new FormData();
        formData.append("name", productName);
        formData.append("img", productImg);
        ...

        try {
            await axios.post("/api/products/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (e: unknown) {
        ...
        }
    }

    //描画コンポーネント
    return (
        <>
            <ProductNameForm productName={productName} setProductName={setProductName} />
            <ProductImgForm productImg={productImg} setProductImg={setProductImg} />
            ...
            <RunButton onClick={handleRegisterProduct} />
        </>
    )
}
```

#### 5.5. エラー処理
- 商品データ未入力時：アラート表示(入力バリデーション)
- axios 通信エラー時：
  - 500 エラー： "商品情報登録中にエラーが発生しました"



## 6. バックエンド処理設計

### 6.1. POST /api/products/register (商品データ登録)

#### 6.1.1 ミドルウェア
- Multer: (定義ファイル: "src/routes/productRoutes.ts")
- uploadImage() (定義ファイル: "src/utils/uploadImage.ts")

#### 6.1.2 処理フロー
1. ルーター "/api/products/register" にルーティングし、upload.single('img')を適用
2. Multerにより req.fileに画像ファイル、req.bodyにフォームデータ格納
3. uploadImage関数で、画像をS3にアップロード
4. S3 URLをproductData.imgに格納
5. Mongooseで商品データ作成
6. MongoDBへ保存
7. JSONデータ(status: 201, ボディ: 登録商品)を返却

#### 6.1.3 コード例
```typescript
export const registerProduct = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //画像ファイル情報の取得
        const filename = req.file.originalname;
        const localPath = req.file.path;

        //S3へのアクセス情報設定
        const s3Key = "${req.body.category}/${filename}";
        const s3Url = await uploadImage(localPath, s3Key);

        //商品データ作成
        const productData = {
            name: req.body.name,
            img: s3Url,
            ...
        };
        const newProduct = new Product(productData);

        //商品データ登録
        await newProduct.save();
        if (!newProduct) {
                throw new AppError("商品データが正しく登録されませんでした", 500);
            }
        res.status(201).json(newProduct);

    } catch (e){
        next(e);
    }
}
```

#### 6.1.4 エラー処理
- ファイル未添付時：400, "画像データが取得できませんでした"
- S3 アップロード失敗時：500, "何らかのサーバーエラーが発生しました"（共通）
- MongoDB 保存失敗時：500, "商品データが正しく登録されませんでした"


## 6.2. POST /api/products (商品一覧データ取得)

### 6.2.1 処理フロー
1. ルーター "/api/products" にルーティング（POSTメソッドを使用）
2. DB から商品データを取得（category指定がある場合は category で絞り込み）
3. 取得後に以下の順で絞り込み処理を実施
    - searchWord による商品名部分一致フィルタ
    - colors による color フィルタ
    - priceRanges による価格帯フィルタ
4. JSONデータ(status: 200, ボディ: 最終的な商品一覧データ)を返却

### 6.2.2 コード例
```typescript
export const allProducts = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let products: ProductType[] = [];
        //フィルター情報取得
        const { searchWord, category, colors, priceRanges } = req.body;

        //フィルター : カテゴリ
        if (category) {
            products = await Product.find({ category })
        } else {
            products = await Product.find({})
        }

        let filteredProducts: ProductType[] = products;
        //フィルター : 商品名キーワード
        if (searchWord) {
            filteredProducts = filteredProducts.filter(c => c.name.includes(searchWord));
        }
        //フィルター : カラー
        if (colors.length > 0) {
            filteredProducts = filteredProducts.filter(c => colors.includes(c.color));
        }
        //フィルター : 価格帯
        if (priceRanges.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                priceRanges.some(c => product.price >= c.minPrice && product.price <= c.maxPrice)
            );
        }
        res.status(200).json(products);

    } catch (e) {
        next(e);
    }
}
```

### 6.2.3 エラー処理
- DB接続失敗など: 500, "何らかのサーバーエラーが発生しました"（共通）
- searchWord / colors / priceRanges が不正な場合も基本的に空配列を返却（エラーにはしない方針）


### 6.3. GET /api/products/:id (商品詳細データ取得)

#### 6.3.1 処理フロー
1. ルーター "/api/products/:id" にルーティング
2. req.params.id を取得
3. Product.findById(id) により商品データ取得
4. JSONデータ(status: 200, ボディ: 取得商品)を返却

#### 6.3.2 コード例
```typescript
export const productDetail = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    //商品ID取得
    const { id } = req.params;

    //商品データ取得
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(foundProduct);
});
```

#### 6.3.3. エラー処理
- 該当するIDの商品が存在しない: 404, "該当する商品データが存在しません"
- DB接続失敗など: 500, "何らかのサーバーエラーが発生しました"（共通）


## 7. その他条件
- S3 リージョン：ap-northeast-1（東京）
- S3 バケットキー、"yuu-furniture-imgs/product/${req.body.category}/${filename}" 


## 8. 今後の改善予定
- Multer の fileFilter / limits によるファイル種別・サイズ制限
- S3 presigned URL 利用による直接アップロード方式への切替