import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

declare var global: {
    app: ReturnType<typeof admin.initializeApp> | null;
    db: ReturnType<typeof getFirestore> | null;
};

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

const app =
    process.env.FIREBASE_SERVICE_ACCOUNT ? global.app ??
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        }) : null;

const db = app ? global.db ?? getFirestore(app) : null;

global.app = app;
global.db = db;

export function getApp() {
    return app;
}

export function getDB() {
    return db;
}
