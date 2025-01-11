import { NextRequest, NextResponse } from 'next/server';
import firestore from '@/lib/firebase/firestore';

//Add participant data
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);
        //check if participant exists
        if (!body.participants){
            const { name, matricNo, desasiswa } = body;
            console.log('Adding participant:', name, matricNo, desasiswa);
            await firestore.addParticipant({ name, matricNo, desasiswa });
        } else {
            const { name, desasiswa, participants } = body;
            console.log('Adding team:', name, desasiswa, participants);
            await firestore.addTeam({ name, desasiswa, participants });
        }
        return NextResponse.json({ message: 'Participant added' });
    } catch (error) {
        console.error('Error adding participant:', error);
        return new NextResponse('Error adding participant', { status: 500 });
    }
}
