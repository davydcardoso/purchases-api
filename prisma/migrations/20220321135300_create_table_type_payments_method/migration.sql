-- CreateTable
CREATE TABLE "payments_method" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "card_number" VARCHAR(4),
    "card_validate" VARCHAR(5),
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "payments_method_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments_method" ADD CONSTRAINT "payments_method_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
