import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

declare var global: {
    app: ReturnType<typeof admin.initializeApp>;
    db: ReturnType<typeof getFirestore>;
};

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

const app =
    global.app ??
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

const db = global.db ?? getFirestore(app);

global.app = app;
global.db = db;

export function getApp() {
    return app;
}

export function getDB() {
    return db;
}
