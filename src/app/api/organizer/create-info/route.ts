import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { checkRole } from '@/utils/roles';
import { db } from '@/firebase/firebase';

export async function POST(req: NextRequest) {
    if (!checkRole('admin')) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

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