import { db } from "@/app/firebase/page";
import { collection, setDoc, doc , addDoc, getDocs, getDoc, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
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

    //read sports data
    async readSportsData(){
        const sports: sports[] = [];
        const querySnapshot = await getDocs(collection(db, "sports"));
        querySnapshot.forEach((doc) => {
            sports.push(doc.data() as sports);
        });
        return sports;
    }
}

const firestore = new Firestore();
export default firestore;
