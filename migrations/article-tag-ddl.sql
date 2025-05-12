CREATE TABLE articles_tags (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    article_id INT(10) UNSIGNED NOT NULL,
    tag_id INT(10) UNSIGNED NOT NULL,
    
    PRIMARY KEY (id),
    UNIQUE KEY tags_articles_unique (article_id, tag_id),
    
    KEY articles_tags_tags_fk (tag_id),
    CONSTRAINT articles_tags_tags_fk FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    
    KEY articles_tags_articles_fk (article_id),
    CONSTRAINT articles_tags_articles_fk FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
