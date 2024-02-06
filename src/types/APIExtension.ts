export interface APIExtension {
    name: string;
    id: string;
    description?: string;
    icon?: string;
    downloads: number;
    author?: {
        name: string;
        isVerified?: boolean;
        github?: string;
    };
}
