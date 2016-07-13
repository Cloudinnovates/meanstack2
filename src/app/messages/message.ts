export class Message {
    title: string;
    content: string;
    created_at: number;
    image: string;
    messageId: string;
    userId: string;

    constructor(title: string, content: string, created_at?: number, image?: string, messageId?: string, userId?: string) {
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.image = image;
        this.messageId = messageId;
        this.userId = userId;
    }
}
