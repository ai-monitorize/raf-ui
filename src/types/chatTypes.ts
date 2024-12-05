export interface MessageType {
    role: "USER" | "ASSISTANT" | "SYSTEM";
    content: string;
    uuid: string;
}