-- CreateIndex
CREATE INDEX "books_title_synops_genre_year_edition_language_author_publi_idx" ON "books"("title", "synops", "genre", "year", "edition", "language", "author", "publisher");

-- CreateIndex
CREATE INDEX "favoriteBooks_book_id_user_id_idx" ON "favoriteBooks"("book_id", "user_id");

-- CreateIndex
CREATE INDEX "users_name_email_registration_address_password_genery_idx" ON "users"("name", "email", "registration", "address", "password", "genery");
