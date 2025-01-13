import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { newSportCategory, sportID } = body;

        console.log('Adding sport category:', newSportCategory, sportID);

        // Add the sport category to Firestore
        const docRef = await firestore.addSportCategory( newSportCategory, sportID);

        if(docRef){
            return NextResponse.json({ message: 'Sport category added' });
        }else{
            return new NextResponse('Error adding sport category', { status: 500 });
        }

    } catch (error) {
        console.error('Error adding sport category:', error);
        return new NextResponse('Error adding sport category', { status: 500 });
    }
}

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