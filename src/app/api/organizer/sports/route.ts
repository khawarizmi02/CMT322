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