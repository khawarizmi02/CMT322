import { db } from '@/firebase/firebase';
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
  sports,
  matches,
  matchesParticipant,
  matchesTeam,
  sessions,
  SessionEvent,
} from '@/data/type/index';
import { Session } from 'inspector/promises';

export class Firestore {
  /* SPORTS MODULE */
  // add sports data
  async addSportsData(data: sports) {
    try {
      const docRef = await addDoc(collection(db, 'sports'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async deleteSportsData(sportID: string) {
    await deleteDoc(doc(db, 'sports', sportID));
    console.log('Document with ID: ', sportID, ' deleted');
  }

  //read sports data
  async readSportsData() {
    const sports: sports[] = [];
    const querySnapshot = await getDocs(collection(db, 'sports'));
    querySnapshot.forEach((doc) => {
      sports.push({
        sportID: doc.id,
        sportName: doc.data().sportName,
        sportCategory: doc.data().sportCategory,
        phase: doc.data().phase,
      });
    });
    console.log(sports);
    return sports;
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
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
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
        participants: doc.data().participants,
        sportName: doc.data().sportName,
        sportCategory: doc.data().sportCategory,
      });
    });
    console.log(matches);
    return matches;
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
