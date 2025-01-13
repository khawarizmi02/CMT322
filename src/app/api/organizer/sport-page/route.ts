import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { sportCategoryID } = body;

        console.log('Deleting sport category:', sportCategoryID);

        // Delete the sport category from Firestore
        await firestore.deleteSportCategory(sportCategoryID);

        return NextResponse.json({ message: 'Sport category deleted' });
    } catch (error) {
        console.error('Error deleting sport category:', error);
        return new NextResponse('Error deleting sport category', { status: 500 });
    }
}

export async function GET() {
    try {
        const sportCategory = await firestore.readSportCategory();

        return NextResponse.json({ sportCategory });
    } catch (error) {
        console.error('Error reading sports:', error);
        return new NextResponse('Error reading sports', { status: 500 });
    }
}