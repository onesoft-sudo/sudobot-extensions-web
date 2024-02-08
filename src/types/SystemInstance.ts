export type SystemInstance = {
    id: string;
    url: string;
    version: string;
};

export type LocalStorageSystemInstance = Pick<SystemInstance, "id" | "url">;
