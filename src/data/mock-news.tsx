// mockData.ts

export type NewsContent = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const NewsDetails: NewsContent[] = [
  {
    id: 'news-001',
    title: 'News Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit tempor nisi, eget tempor ante. Aliquam erat volutpat.',
    image:
      'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'news-002',
    title: 'News Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit tempor nisi, eget tempor ante. Aliquam erat volutpat.',
    image:
      'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'news-003',
    title: 'News Title 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit tempor nisi, eget tempor ante. Aliquam erat volutpat.',
    image:
      'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'news-004',
    title: 'News Title 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit tempor nisi, eget tempor ante. Aliquam erat volutpat.',
    image:
      'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const newsArticles = [
  {
    id: 1,
    title: 'Breaking Tech Innovations',
    description:
      'Explore the latest groundbreaking technologies transforming our world.',
    date: 'November 25, 2024',
    tags: ['Football', 'Men Single'],
    imageUrl:
      'https://img.chelseafc.com/image/upload/f_auto,w_1440,c_fill,g_faces,q_90/editorial/match-reports/2024-25/Newcastle%20A%20Carabao%20Cup/chelsea-team-newcastle-301024.jpg',
  },
  {
    id: 2,
    title: 'Global Climate Action Summit',
    description:
      'World leaders discuss critical strategies for environmental sustainability.',
    date: 'November 20, 2024',
    tags: ['Voleyball', 'Men '],
    imageUrl:
      'https://fizik.usm.my/images/School_Activities/2024/Sukan_Antara_Pusat_Pengajian_Sains_2024_SUKAPPS_2024/DSC05015.JPG',
  },
  {
    id: 3,
    title: 'AI Advances in Healthcare',
    description:
      'How artificial intelligence is revolutionizing medical diagnostics and treatment.',
    date: 'November 15, 2024',
    tags: ['Badminton', 'Mixed Double'],
    imageUrl:
      'https://cdn.rri.co.id/berita/8/images/1707037813745-W/nzcbu8s18nc50aj.jpeg',
  },
  {
    id: 4,
    title: 'AI Advances in Healthcare',
    description:
      'How artificial intelligence is revolutionizing medical diagnostics and treatment.',
    date: 'November 15, 2024',
    tags: ['Football', 'Healthcare'],
    imageUrl:
      'https://news.usm.my/images/phocafavicon/0B81F65F-2BD9-4CD4-85AD-4BC8D5D21C7D.jpeg',
  },
];
