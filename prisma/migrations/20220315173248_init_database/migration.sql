-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(180) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "users_id" TEXT,
    "address" VARCHAR(180) NOT NULL,
    "zip_code" VARCHAR(80) NOT NULL,
    "complement" VARCHAR(180) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_locations" (
    "id" TEXT NOT NULL,
    "zip_code" VARCHAR(80) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "available_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "description" VARCHAR(180) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0.01,
    "available" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "id" TEXT NOT NULL,
    "purchase_date" DATE NOT NULL,
    "purchase_total" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" TEXT NOT NULL,
    "purchase_order_id" TEXT NOT NULL,
    "product_id" VARCHAR(80) NOT NULL,
    "unitary_value" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PurchaseOrderToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PurchaseOrderToUsers_AB_unique" ON "_PurchaseOrderToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchaseOrderToUsers_B_index" ON "_PurchaseOrderToUsers"("B");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseOrderToUsers" ADD FOREIGN KEY ("A") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchaseOrderToUsers" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
