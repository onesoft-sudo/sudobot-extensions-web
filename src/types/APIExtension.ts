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
    readmeFileName?: string;
    readmeContents?: string;
    tarballs: Array<Tarball>;
}

export type PartialAPIExtension = Pick<
    APIExtension,
    | "id"
    | "name"
    | "author"
    | "icon"
    | "author"
    | "license"
    | "description"
    | "downloads"
    | "security"
>;

export type Tarball = {
    url: string;
    checksum: string;
    basename: string;
    version: string;
    size: number;
};
