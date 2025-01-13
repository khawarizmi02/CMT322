import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Define your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); // Parse the request body

        console.log('Data received:', data);

        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'News'), data);

        console.log('Document written with ID: ', docRef.id);
        return NextResponse.json({ infoId: docRef.id });
    } catch (error) {
        console.error('Error writing info:', error);
        return new NextResponse('Error writing info', { status: 500 });
    }
}








// import { NextApiRequest } from 'next';
// import { initializeApp, getApps } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { NextResponse } from 'next/server';

// // Define your Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// if (!getApps().length) {
//     initializeApp(firebaseConfig);
// }

// const db = getFirestore();

// export async function POST(req: NextApiRequest) {
//     try {
//         // const data = req.body;

//         const data = await req.json();

//         console.log('Data received:', data);

//         const docRef = await addDoc(collection(db, 'News'), data);

//         console.log('Document written with ID: ', docRef.id);
//         return NextResponse.json({ infoId: docRef.id })
//     } catch (error) {
//         // tengok rupa data tu
//         const data = req.body;
//         console.log('Data received:', data);

//         console.error('Error writing info:', error);
//         return new NextResponse('Error writing info', { status: 500 });
//     }
// }