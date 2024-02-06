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
    license: string;
    licenseURL: string;
    homepage?: string;
    repository?: string;
    issues?: string;
    security: "safe" | "unsafe" | "unknown";
    lastUpdated: Date;
}
