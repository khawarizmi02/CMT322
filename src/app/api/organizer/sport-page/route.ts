import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { sportName, sportCategoryName, sportPhase } = body;

//         console.log('Adding sport:', sportName, sportCategoryName, sportPhase);

//         // Add the sport category to Firestore
//         const docRef = await firestore.addSportCategory(sportCategoryName);
//         // Add the sport to Firestore
//         await firestore.addSportsData( {sportName, sportPhase } ,docRef);

//         return NextResponse.json({ message: 'Sport added' });
//     } catch (error) {
//         console.error('Error adding sport:', error);
//         return new NextResponse('Error adding sport', { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { sportID } = body;

//         console.log('Deleting sport:', sportID);

//         // Delete the sport from Firestore
//         await firestore.deleteSportsData(sportID);

//         return NextResponse.json({ message: 'Sport deleted' });
//     } catch (error) {
//         console.error('Error deleting sport:', error);
//         return new NextResponse('Error deleting sport', { status: 500 });
//     }
// }

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