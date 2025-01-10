import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sportName, sportCategory, phase } = body;

        console.log('Adding sport:', sportName, sportCategory, phase);

        // Add the sport to Firestore
        await firestore.addSportsData({ sportName, sportCategory, phase });

        return NextResponse.json({ message: 'Sport added' });
    } catch (error) {
        console.error('Error adding sport:', error);
        return new NextResponse('Error adding sport', { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { sportID } = body;

        console.log('Deleting sport:', sportID);

        // Delete the sport from Firestore
        await firestore.deleteSportsData(sportID);

        return NextResponse.json({ message: 'Sport deleted' });
    } catch (error) {
        console.error('Error deleting sport:', error);
        return new NextResponse('Error deleting sport', { status: 500 });
    }
}

export async function GET() {
    try {
        const sports = await firestore.readSportsData();

        return NextResponse.json({ sports });
    } catch (error) {
        console.error('Error reading sports:', error);
        return new NextResponse('Error reading sports', { status: 500 });
    }
}