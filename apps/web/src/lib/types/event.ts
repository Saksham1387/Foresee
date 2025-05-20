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
}