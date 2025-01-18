import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

import firestore from '@/lib/firebase/firestore';
import { storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(req: NextRequest) {
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const formData = await req.formData(); // Parse the request body as FormData
    const data = JSON.parse(formData.get('data') as string); // Extract the JSON data
    const imageFile = formData.get('image') as File; // Extract the image file

    console.log('Data received:', data);

    let imageUrl = '';
    if (imageFile) {
      const storageRef = ref(storage, `news_images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Add a new document with a generated ID
    const news = await firestore.createNews({ ...data, imageUrl });

    if (!news) {
      return new NextResponse('Error creating news', { status: 500 });
    }

    return NextResponse.json({ infoId: news.id });
  } catch (error) {
    console.error('Error writing info:', error);
    return new NextResponse('Error writing info', { status: 500 });
  }
}

export async function GET() {
  try {
    // Read all documents in the 'News' collection
    const newsList = await firestore.getAllNews();
    console.log('newsList from server:', newsList);

    return NextResponse.json({ newsList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}
