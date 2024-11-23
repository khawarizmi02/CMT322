// // "use client";
// // import { useState, useEffect } from "react";
// import {
//   query,
//   collection,
//   getDoc,
//   QuerySnapshot,
//   doc,
//   getDocs,
// } from "firebase/firestore";

// import Image from "next/image";
// import { db } from "@/firebase/firebase";
// // import { set } from "date-fns";

// export default function Home() {
//   // const [data, setData] = useState<any[]>([]);
//   // useEffect(() => {
//   //   const fetchDocs = async () => {
//   //     const q = query(collection(db, "User"));
//   //     const querySnapshot = await getDocs(q);
//   //     querySnapshot.forEach((doc) => {
//   //       console.log(doc.id, " => ", doc.data());
//   //       setData((prevData) => [...prevData, doc.data()]);
//   //     });
//   //   };
//   //   fetchDocs();
//   // }, []);

//   return (
//     <div className="flex flex-col items-center">
//       <div>Hello</div>
//       {/* <div>
//         {data.map((item) => (
//           <div>{item.email}</div>
//         ))}
//       </div> */}
//     </div>
//   );
// }


import React from 'react';
import { Inter } from 'next/font/google';
import { FaMapMarkerAlt, FaBookmark, FaBell, FaPlay, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewsDetails } from '@/data/mock-news';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
  return (
    <div className={`${inter.className} grid grid-cols-1 max-w-full `}>
      {/* Announcement */}
      <div className="bg-gray-100 p-4 w-screen h-96 flex">
        <div className="w-1/2 p-4">
          <h1 className="text-xl font-bold">Announcement Topic</h1>
          <h2 className="text-lg font-bold">Announcement Sub Topic</h2>
          <p className="justify-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit tempor nisi, eget tempor ante. Aliquam erat volutpat. Aliquam tristique, purus eu sodales volutpat, purus odio ullamcorper nisl, vel pulvinar diam erat vel purus. Nunc vel aliquam lectus. Cras commodo dolor ac nibh scelerisque porta. Phasellus vitae velit non nibh aliquam mollis in non massa. Nunc id suscipit mauris. Nulla facilisi. Donec ornare, nulla in gravida molestie, ligula massa posuere mi, nec tempor sapien erat in elit. Cras molestie a ligula aliquet tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vel nisi id sem condimentum sollicitudin et eget mi. Integer ac sollicitudin turpis. Ut condimentum neque vitae tellus pretium consectetur. Curabitur tempus tellus quis luctus consectetur.
          </p>
        </div>
        <div className="w-1/3 flex justify-center items-center">
        <Image src="/images/football.jpg" alt="Football" layout="intrinsic" width={300} height={200} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-80 py-2.5">
        <button className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
          <FaMapMarkerAlt />
          Register Now!
        </button>
        <button className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
          <FaBookmark />
          Upcoming Event!
        </button>
        <button className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
          <FaBell />
          Event List!
        </button>
      </div>

      {/* News
      <div>
        <div className="flex bg-gray-100 p-4">
          <h1 className="text-lg font-medium">News!</h1>
          <button title='News' className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
            <FaArrowRight />
          </button>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className='flex gap-4'>
              {NewsDetails.map((news) => (
                <div className='w-[400px] h-[300px] ' >
                <Card className='w-full h-full'>
                  <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <Image src={`${news.image}`} alt="Football" layout="intrinsic" width={300} height={200} />
                  </CardContent>
                  <CardFooter>
                  <button className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
                    <FaPlay />
                    Watch Now!
                  </button>
                  </CardFooter>
                </Card>
                </div>
                
              ))}</div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div> */}
        <div className="flex bg-gray-100 p-4">
          <h1 className="text-lg font-medium">News!</h1>
          <button title='News' className="bg-transparent text-[#654321] px-6 py-3 rounded-md flex items-center gap-2">
            <FaArrowRight />
          </button>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className='flex gap-4'>
              {NewsDetails.map((news) => (
                <div className='w-[400px] h-[400px]'>
                  <Card className='w-full h-full flex flex-col'>
                    <CardHeader className='p-4 space-y-2 flex-shrink-0'>
                      <CardTitle className='text-lg'>{news.title}</CardTitle>
                      <CardDescription className='text-sm line-clamp-2'> {/* Added line-clamp-2 */}
                        {news.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='p-4 flex-grow flex items-center justify-center'>
                      <div className='relative w-full h-[200px]'>
                        <Image 
                          src={`${news.image}`} 
                          alt="Football" 
                          layout="fill"
                          objectFit="contain"
                          className='rounded-md'
                        />
                      </div>
                    </CardContent>
                    <CardFooter className='p-4 flex-shrink-0'>
                      <button className="bg-transparent text-[#654321] px-6 py-2 rounded-md flex items-center gap-2 text-sm">
                        <FaPlay />
                        Watch Now!
                      </button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

      {/* About Us */}
      <div className="bg-gray-100 p-4">
        <h2 className="text-lg font-medium">About Us</h2>
        <p>
          Learn more about our organization and our mission.
        </p>
      </div>
    </div>
    
  );
};

export default Home;