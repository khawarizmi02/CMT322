import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firestore from '@/lib/firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const sportCategoryName = formData.get('sportCategoryName') as string;
        const sportID = formData.get('sportID') as string;
        const imageFile = formData.get('image') as File | null;

        let imageUrl = '';
        if (imageFile) {
            const storageRef = ref(storage, `sport_category/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(storageRef);
        }

        const newSportCategory = {
            sportCategoryName,
            imageUrl,
            sportID
        };

        // Add the sport category to Firestore
        const docRef = await firestore.addSportCategory(newSportCategory, sportID);

        if(docRef){
            return NextResponse.json({ 
                message: 'Sport category added',
                imageUrl 
            });
        } else {
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