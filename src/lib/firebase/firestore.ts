import { db } from '@/firebase/firebase';
import { collection, setDoc, doc , addDoc, getDocs, getDoc, query, where, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { sports, matches, matchesParticipant, matchesTeam } from '@/data/type/index';

export class Firestore{
    //add sports data
    async addSportsData(data: sports){
        try{
            const docRef = await addDoc(collection(db, "sports"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch(e){
            console.error("Error adding document: ", e);
        }
    }

    async deleteSportsData(sportID: string){
        await deleteDoc(doc(db, "sports", sportID));
        console.log("Document with ID: ", sportID, " deleted");
    }

    //read sports data
    async readSportsData(){
        const sports: sports[] = [];
        const querySnapshot = await getDocs(collection(db, "sports"));
        querySnapshot.forEach((doc) => {
            sports.push({
                sportID: doc.id,
                sportName: doc.data().sportName,
                sportCategory: doc.data().sportCategory,
                phase: doc.data().phase
            });
        });
        console.log(sports);
        return sports;
    }

    //Run once to import the matcehs data
    async importMatchesData(){
        const matches = require('@/data/matches.json');
        console.log(matches);
        for (const match of matches){
            const { sportID, ...matchData } = match;
            const docRef = await addDoc(collection(db, "matches"), matchData);
            console.log("Document written with ID: ", docRef.id);
        }
    }

    async createMatches(data: matches){
        try{
            const docRef = await addDoc(collection(db, "matches"), data);
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch(e){
            console.error("Error adding document: ", e);
        }
    }

    async readMatches(){
        const matches: matches[] = [];
        const querySnapshot = await getDocs(collection(db, "matches"));
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
                sportCategory: doc.data().sportCategory
            });
        });
        console.log(matches);
        return matches;
    }

    async addParticipant(data: matchesParticipant){
        try{
            const docRef = await addDoc(collection(db, "participants"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch(e){
            console.error("Error adding document: ", e);
        }
    }

    async addTeam(data: matchesTeam){
        try{
            const docRef = await addDoc(collection(db, "teams"), {
                teamName: data.name,
                desasiswa: data.desasiswa,
                participants: data.participants
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(e){
            console.error("Error adding document: ", e);
        }
    }
}

const firestore = new Firestore();
export default firestore;
