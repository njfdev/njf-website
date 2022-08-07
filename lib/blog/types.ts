export interface BlogMetadata {
    id: String;
    slug: String;
    title: String;
    description: String;
    thumbnail: String;
    published: Boolean;
    publish_date: Date;
    update_date: Date;
    paid: Boolean;
}

export interface BlogBody {
    id: String;
    body: String;
}

export interface Blog extends BlogMetadata, BlogBody {}