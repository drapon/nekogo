# db-migrate - D1データベースのマイグレーションを生成・適用する

## 説明

DBスキーマ（`packages/db/src/schema/index.ts`）を変更した後、本番D1データベースにマイグレーションを適用するコマンドです。

**重要**: スキーマ変更後にこのコマンドを実行しないと、本番環境でエラーが発生します。

## 実行手順

### 1. スキーマ変更の確認

```bash
# 現在のスキーマを確認
cat packages/db/src/schema/index.ts
```

### 2. マイグレーションファイルの生成

```bash
bun run db:generate
```

生成されたファイルを確認：
```bash
ls -la packages/db/src/migrations/
cat packages/db/src/migrations/*.sql | tail -20
```

### 3. 本番D1データベースへの適用

```bash
# D1データベース一覧を確認
bunx wrangler d1 list

# マイグレーションを適用（nekogo-temp-database-hayashi）
bunx wrangler d1 execute nekogo-temp-database-hayashi --remote --file packages/db/src/migrations/<新しいマイグレーションファイル>.sql
```

または、SQLを直接実行：
```bash
bunx wrangler d1 execute nekogo-temp-database-hayashi --remote --command "<SQL文>"
```

### 4. 適用結果の確認

```bash
# テーブル構造を確認
bunx wrangler d1 execute nekogo-temp-database-hayashi --remote --command "PRAGMA table_info(<テーブル名>);"
```

### 5. 変更をコミット

マイグレーションファイルをリポジトリにコミットする：
```bash
git add packages/db/src/migrations/
git commit -m "chore: D1マイグレーション追加"
```

## 注意事項

- `bun run db:push` はローカル環境用です（本番には使えません）
- `bun run deploy` は認証エラーになる場合があるため、wranglerで直接適用するのが確実です
- 破壊的な変更（カラム削除など）は慎重に行ってください

## トラブルシューティング

### 本番で保存エラーが発生した場合

1. スキーマとDBの差分を確認
2. 足りないカラムを特定
3. ALTER TABLE文で追加

```bash
bunx wrangler d1 execute nekogo-temp-database-hayashi --remote --command "ALTER TABLE <テーブル> ADD <カラム名> <型> DEFAULT <デフォルト値> NOT NULL;"
```
