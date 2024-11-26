// mockData.ts 

export type SportsListCopy = {
    id: string;
    title: string;
    description?: string,
    categories?: {
      id: string,
      category: string;
      image: string;
    }[]
  };
  
  export const SportsListDetailsCopy: SportsListCopy[] = [
    {
        id: "splist-001",
        title: "Badminton",
        categories: [
            {
                id: "cat-001",
                category: "Men's Single",
                image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: "cat-002",
                category: "Women's Single",
                image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
    },
    {
        id: "splist-002",
        title: "Volleyball",
        categories: [
            {
                id: "cat-003",
                category: "Women's Team",
                image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
    },
    {
        id: "splist-003",
        title: "Netball",
        categories: [
            {
                id: "cat-004",
                category: "Mixed Team",
                image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
    },
    {
        id: "splist-004",
        title: "Football",
        categories: [
            {
                id: "cat-005",
                category: "Men's Team",
                image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
    }
];
