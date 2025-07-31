export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
}

export interface QuickActionItem {
    title: string;
    desc: string;
}

export interface QuickActionCategories {
    [key: string]: QuickActionItem[];
}

export const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px (w-64)
