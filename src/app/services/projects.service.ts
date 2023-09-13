import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string[];
  banner: string;
  screenshots?: string[];
  tools: string[];
  seeLive: string;
  sourceCodeUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  screenshotsFolderPath = '../../../../assets/screenshots/';

  constructor() {}

  projects: Project[] = [
    {
      id: 3,
      title: 'Shelter Dogs and Cats',
      description: [
        'Welcome to Shelter Dogs and Cats, a heartwarming online platform dedicated to our furry friends in need. Our mission is simple yet profound: to connect deserving shelter dogs and cats with loving forever homes.',
        'On our website, youll find a wealth of detailed information about the wonderful animals residing in shelters, eagerly waiting for their future owners. Each profile tells a unique story, showcasing the personality, history, and individual needs of these lovable companions. Whether youre seeking a loyal canine companion or a charming feline friend, you can explore our comprehensive listings to discover the perfect match for your home and heart.',
        'We believe that every paw deserves a place to call home, and were here to make that happen. Join us in this heartwarming journey of compassion and adoption, where together, we can transform the lives of shelter dogs and cats, and bring joy and love into your home. Explore our website, meet our furry residents, and start the beautiful journey of pet adoption today.',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}shelter-1${'.png'}`,
        `${this.screenshotsFolderPath}shelter-2${'.png'}`,
      ],
      tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      seeLive: 'https://azat-farmanyan.github.io/shelter/pages/main/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/shelter',
    },
    {
      id: 3,
      title: 'Tic Tac Toe',
      description: [
        'Enter the world of Ultimate Tic Tac Toe, where strategic brilliance meets timeless fun. This classic game has been reimagined and supercharged for the digital age. Whether you are a seasoned strategist or new to the game, Ultimate Tic Tac Toe promises an exhilarating experience that challenges your wits and captivates your competitive spirit.',
        'Our digital version of Tic Tac Toe comes to life with sleek design and intuitive gameplay. Play against friends, family, or AI opponents with varying levels of difficulty. With responsive controls optimized for web and mobile, you can enjoy Ultimate Tic Tac Toe on your device of choice.',
        'But this is no ordinary Tic Tac Toe; its the Ultimate version. Multiple boards, dynamic play, and strategic depth await. Every move you make influences the game at large, adding layers of complexity and excitement. Will you seize the opportunity to win on the grand board, or will your opponent outmaneuver you? Only the most skilled players will emerge victorious.',
        'Ultimate Tic Tac Toe is more than just a game; its an invitation to challenge your mind, test your strategy, and share moments of triumph with friends and rivals alike. Join us in this ultimate gaming adventure and see if you have what it takes to conquer the board!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}tic-tac-toe-1${'.png'}`,
        `${this.screenshotsFolderPath}tic-tac-toe-2${'.png'}`,
        `${this.screenshotsFolderPath}tic-tac-toe-3${'.png'}`,
      ],
      tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      seeLive: 'https://azat-farmanyan.github.io/TicTacToe/pages/game/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/TicTacToe',
    },
    {
      id: 2,
      title: 'Calculator',
      description: [
        'Introducing the Ultimate Calculator, your versatile and responsive companion for all your mathematical needs, whether you are on your computer or your mobile device. We have taken the humble calculator and transformed it into a sleek, user-friendly tool that adapts to your every calculation, no matter where you are. On your computer or laptop, our web-based calculator offers a seamless and intuitive experience. Whether it is simple arithmetic or complex equations, our calculators responsive design ensures that you have a powerful calculation tool at your fingertips.',
        'But we did not stop there. The Ultimate Calculator is also your trusted ally on mobile devices. Need to make quick calculations while on the go? No problem! Our mobile-friendly interface adapts effortlessly to your smartphone or tablet, delivering the same precision and ease of use you expect. From basic addition to advanced trigonometry, the Ultimate Calculator is your go-to tool for all your mathematical adventures. It is not just a calculator; it is a flexible and responsive mathematical companion that is ready to assist you anytime, anywhere. Join us and simplify your calculations with style and convenience.',
      ],
      banner: `banner`,
      screenshots: [`${this.screenshotsFolderPath}calc${'.png'}`],
      tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      seeLive: 'https://azat-farmanyan.github.io/calculator/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/calculator',
    },
    {
      id: 1,
      title: 'Book Shop',
      description: [
        'Welcome to Bookshop, a digital haven for bibliophiles and bookworms. Immerse yourself in a world where the written word reigns supreme. This virtual bookshop is more than just an online store; it is a sanctuary for all things literary. Explore an extensive collection of books spanning genres, eras, and cultures. Craft your own literary journey by curating your personal library with a simple click. And for those moments when you are on the hunt for a specific title, our search feature serves as your trusty guide. Bookshop transcends mere e-commerce; it is a celebration of the enduring magic of the written word. Join us in this literary adventure and let your love for books flourish.',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}bookshop-1${'.png'}`,
        `${this.screenshotsFolderPath}bookshop-2${'.png'}`,
      ],
      tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      seeLive: 'https://azat-farmanyan.github.io/BookShop/pages/main/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/BookShop',
    },
  ];

  getProjectById(id: number): Project | null {
    const emptyProject = {
      id: 0,
      title: '',
      description: '',
      img: '',
      screenshots: [],
      tools: [],
      seeLive: '',
      sourceCodeUrl: '',
    };
    const gotProject = this.projects.find((project) => project.id === id);

    return gotProject ?? null;
  }
}
