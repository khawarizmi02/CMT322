// "use client";
// import { useState, useEffect } from "react";
import {
  query,
  collection,
  getDoc,
  QuerySnapshot,
  doc,
  getDocs,
} from "firebase/firestore";

import Image from "next/image";
import { db } from "@/firebase/firebase";
// import { set } from "date-fns";

export default function Home() {
  // const [data, setData] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchDocs = async () => {
  //     const q = query(collection(db, "User"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //       setData((prevData) => [...prevData, doc.data()]);
  //     });
  //   };
  //   fetchDocs();
  // }, []);

  return (
    <div>
      <div>Hello</div>
      {/* <div>
        {data.map((item) => (
          <div>{item.email}</div>
        ))}
      </div> */}
    </div>
  );
}
