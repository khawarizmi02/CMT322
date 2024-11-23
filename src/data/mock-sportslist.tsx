// mockData.ts

export type SportsList = {
    id: string;
    title: string;
    category: string;
    image: string;
  };
  
  export const SportsListDetails: SportsList[] = [
    {
        id: 'splist-001',
        title: "Badminton",
        category: "Men's Single.",
        image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 'splist-002',
        title: "Badminton",
        category: "Women's Single.",
        image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        id: 'splist-003', 
        title: "Volleyball", 
        category: "Women's Team", 
        image: "https://images.unsplash.com/photo-1504890193030-c765d8913c70?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      },
      { 
        id: 'splist-004', 
        title: "Netball", 
        category: "Mixed Team", 
        image: "https://images.unsplash.com/photo-1517646943562-4b83b39d3e7d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      },
      { 
        id: 'splist-005', 
        title: "Football", 
        category: "Men's Team", 
        image: "https://images.unsplash.com/photo-1474820541404-1623a1ba5203?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      }      
  ];