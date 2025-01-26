import { db, storage } from '@/firebase/firebase';
import {
  collection,
  setDoc,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from 'firebase/storage';
import {
  sports,
  sportCategory,
  matches,
  matchesParticipant,
  matchesTeam,
  news,
  sessions,
  SessionEvent,
} from '@/data/type/index';

export class Firestore {
  //add sports data
  async addSportsData(data: sports) {
    try {
      const docRef = await addDoc(collection(db, 'sports'), {
        sportName: data.sportName,
      });
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async addSportCategory(data: sportCategory, sportID: string) {
    try {
      const docRef = await addDoc(collection(db, 'category'), {
        sportCategoryName: data.sportCategoryName,
        imageUrl: data.imageUrl || '',
        sportRef: doc(db, 'sports', sportID),
        goldMedal: '',
        silverMedal: '',
        bronzeMedal: '',
      });
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async deleteSportsData(sportID: string) {
    await deleteDoc(doc(db, 'sports', sportID));
    console.log('Document with ID: ', sportID, ' deleted');
  }

  async deleteSportCategory(sportCategoryID: string) {
    // Retrieve the document to get the image URL
    const docRef = doc(db, 'category', sportCategoryID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const categoryData = docSnap.data();
      
      // Delete image from Firebase Storage if it exists
      if (categoryData.imageUrl) {
        try {
          const storage = getStorage();
          const imageRef = ref(storage, categoryData.imageUrl);
          await deleteObject(imageRef);
          console.log('Image deleted from storage');
        } catch (error) {
          console.error('Error deleting image from storage:', error);
        }
      }
    }
  
    // Delete the document from Firestore
    await deleteDoc(docRef);
    console.log('Document with ID: ', sportCategoryID, ' deleted');
  }

  //read sports data
  async readSportsData() {
    const sports: sports[] = [];
    const querySnapshot = await getDocs(collection(db, 'sports'));
    querySnapshot.forEach((doc) => {
      sports.push({
        sportID: doc.id,
        sportName: doc.data().sportName,
      });
    });
    console.log(sports);
    return sports;
  }

  //read sports category data
  async readSportCategory() {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));

      // Use Promise.all to handle async operations
      const sportCategory = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const sportSnap = await getDoc(doc.data().sportRef);
          return {
            sportCategoryID: doc.id,
            sportName:
              (sportSnap.data() as sports)?.sportName || 'Unknown Sport',
            sportCategoryName: doc.data().sportCategoryName,
            sportRef: doc.data().sportRef,
            imageUrl: doc.data().imageUrl,
            goldMedal: doc.data().goldMedal,
            silverMedal: doc.data().silverMedal,
            bronzeMedal: doc.data().bronzeMedal,
          };
        })
      );

      console.log(sportCategory); // Debugging log
      return sportCategory;
    } catch (error) {
      console.error('Error fetching sport categories: ', error);
      return [];
    }
  }

  /* MATCHES MODULE */
  //Run once to import the matcehs data
  async importMatchesData() {
    const matches = require('@/data/matches.json');
    console.log(matches);
    for (const match of matches) {
      const { sportID, ...matchData } = match;
      const docRef = await addDoc(collection(db, 'matches'), matchData);
      console.log('Document written with ID: ', docRef.id);
    }
  }

  async createMatches(data: matches) {
    try {
      const docRef = await addDoc(collection(db, 'matches'), data);
      console.log('Matches created with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error creating matches: ', e);
    }
  }

  async readMatches() {
    const matches: matches[] = [];
    const querySnapshot = await getDocs(collection(db, 'matches'));
    querySnapshot.forEach((doc) => {
      matches.push({
        matchID: doc.id,
        sportID: doc.data().sportID,
        matchDate: doc.data().matchDate,
        matchTime: doc.data().matchTime,
        matchStatus: doc.data().matchStatus,
        matchVenue: doc.data().matchVenue,
        matchWinner: doc.data().matchWinner,
        matchScore: doc.data().matchScore,
        teams: doc.data().teams,
        sportName: doc.data().sportName,
        sportCategory: doc.data().sportCategory,
        sportCategoryID: doc.data().sportCategoryID,
      });
    });
    console.log(matches);
    return matches;
  }

  async readMatchesBySportCategory(sportCategoryID: string) {
    const matches: matches[] = [];
    const q = query(
      collection(db, 'matches'),
      where('sportCategoryID', '==', sportCategoryID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      matches.push({
        matchID: doc.id,
        sportID: doc.data().sportID,
        matchDate: doc.data().matchDate,
        matchTime: doc.data().matchTime,
        matchStatus: doc.data().matchStatus,
        matchVenue: doc.data().matchVenue,
        matchWinner: doc.data().matchWinner,
        matchScore: doc.data().matchScore,
        teams: doc.data().teams,
        sportName: doc.data().sportName,
        sportCategory: doc.data().sportCategory,
        sportCategoryID: doc.data().sportCategoryID,
      });
    });
    console.log(matches);
    return matches;
  }

  /* NEWS MODULE */
  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  async createNews(data: news, imageFile?: File) {
    if (imageFile) {
      const imageUrl = await this.uploadImage(
        imageFile,
        `news/${imageFile.name}`
      );
      data.imageUrl = imageUrl;
    }
    data['date'] = new Date().toISOString();
    try {
      const docRef = await addDoc(collection(db, 'News'), data);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async readNews(news_id: string) {
    const docRef = doc(db, 'News', news_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  }

  async updateNews(news_id: string, data: news) {
    try {
      await updateDoc(doc(db, 'News', news_id), data);
      console.log('Document with ID: ', news_id, ' updated');
      return true;
    } catch (e) {
      console.error('Error updating document: ', e);
      return false;
    }
  }

  async deleteNews(news_id: string) {
    try {
      const news = await this.readNews(news_id);
      if (news && news.imageUrl) {
        const storageRef = ref(storage, news.imageUrl);
        await deleteObject(storageRef);
      }
      await deleteDoc(doc(db, 'News', news_id));
      console.log('Document with ID: ', news_id, ' deleted');
      return true;
    } catch (e) {
      console.error('Error deleting document: ', e);
      return false;
    }
  }

  async readAnnouncements() {
    const announcements: news[] = [];
    try {
      const q = query(
        collection(db, 'News'),
        where('type', '==', 'announcement')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        announcements.push({
          newsID: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          date: doc.data().date,
          imageUrl: doc.data().imageUrl,
          type: doc.data().type,
          tags: doc.data().tags,
        });
      });
      console.log(announcements);
      return announcements;
    } catch (error) {
      console.error('Error fetching announcements: ', error);
      return [];
    }
  }

  async getAllNews() {
    const news: news[] = [];
    const querySnapshot = await getDocs(collection(db, 'News'));
    querySnapshot.forEach((doc) => {
      news.push({
        newsID: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
        imageUrl: doc.data().imageUrl,
        type: doc.data().type,
        tags: doc.data().tags,
      });
    });
    console.log(news);
    return news;
  }

  /* SESSIONS MODULE */
  async createSession(data: sessions) {
    try {
      const docRef = await addDoc(collection(db, 'sessions'), data);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async updateSession(session_id: string, data: sessions, event: SessionEvent) {
    try {
      await updateDoc(doc(db, 'sessions', session_id), data);
      console.log('Document with ID: ', session_id, ' updated');
      return true;
    } catch (e) {
      console.error('Error updating document: ', e);
      return false;
    }
  }

  async userSession(user_id: string) {
    const sessions: sessions[] = [];
    const q = query(
      collection(db, 'sessions'),
      where('user_id', '==', user_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      sessions.push({
        session_id: doc.id,
        user_id: doc.data().user_id,
        client_id: doc.data().client_id,
        created_at: doc.data().created_at,
        expire_at: doc.data().expire_at,
        last_active_at: doc.data().last_active_at,
        status: doc.data().status,
        updated_at: doc.data().updated_at,
        abandon_at: doc.data().abandon_at,
      });
    });
    console.log(sessions);
    return sessions;
  }

  async readSessions() {
    const sessions: sessions[] = [];
    const querySnapshot = await getDocs(collection(db, 'sessions'));
    querySnapshot.forEach((doc) => {
      sessions.push({
        session_id: doc.id,
        user_id: doc.data().user_id,
        client_id: doc.data().client_id,
        created_at: doc.data().created_at,
        expire_at: doc.data().expire_at,
        last_active_at: doc.data().last_active_at,
        status: doc.data().status,
        updated_at: doc.data().updated_at,
        abandon_at: doc.data().abandon_at,
      });
    });
    console.log(sessions);
    return sessions;
  }
}

const firestore = new Firestore();
export default firestore;
