export type TEvent = {
    id: string;
    title: string;
    description: string;
    expiresAt: string;
    isActive: boolean;
    yesPrice: string;
    noPrice: string;
    resolution? : string;
    volume: string;
    resolvedAt?: string;
    thumbnail: string;
    question: string;
}

export type TTrade = {
    price: string;
    quantity: string;
    outcome: string;
    timestamp: string;
}