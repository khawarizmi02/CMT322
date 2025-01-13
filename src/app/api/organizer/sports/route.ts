import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const { sportName } = body;

        console.log('Adding new sport:', sportName);

        // Add the sport category to Firestore
        const docRef = await firestore.addSportsData({sportName});

        if(docRef){
            return NextResponse.json({ message: 'Sport added' });
        }else{
            return new NextResponse('Error adding sport category', { status: 500 });
        }

    }catch(error){
        console.error('Error adding sport category:', error);
        return new NextResponse('Error adding sport category', { status: 500 });
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