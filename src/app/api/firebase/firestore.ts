import { db } from '@/firebase/firebase';
import { collection, setDoc, doc , addDoc, getDocs, getDoc, query, where, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { sports } from '@/data/type/index';

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
}

const firestore = new Firestore();
export default firestore;
