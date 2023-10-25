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
      id: 13,
      title: 'Pizza Cheff',
      description: [
        'Pizza Cheff is a mouthwatering culinary project designed to celebrate the art of pizza-making. This visually enticing webpage offers a tantalizing glimpse into the world of cheesy, saucy, and delicious pizzas. From classic Margheritas to adventurous flavor combinations, Pizza Cheff showcases an extensive array of delectable options, sure to satisfy every pizza lovers cravings.',
        'Our webpage provides a feast for the eyes with high-quality images of meticulously crafted pizzas that will make your taste buds tingle. Pizza Cheff also offers easy-to-follow recipes and step-by-step guides, making it a go-to resource for aspiring home chefs looking to replicate the magic of pizzerias right in their own kitchens.',
        'At Pizza Cheff, we are not just about pizza; we are about sharing a passion for the culinary arts. Whether you are a seasoned pro or a novice, this page is your gateway to a world of savory satisfaction. Join us on this delightful pizza journey and discover the secrets to crafting pizza perfection.',
        'With its delectable visuals and comprehensive guides, Pizza Cheff is a testament to the delicious and creative world of pizza-making. Dive into our page, and you will soon be on your way to mastering the art of pizza.',
      ],
      banner: `banner`,
      screenshots: [`${this.screenshotsFolderPath}pizza-cheff${'.png'}`],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],
      seeLive: 'https://papaya-praline-2e765d.netlify.app/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/pizzaCheff',
    },
    {
      id: 12,
      title: 'Posts App',
      description: [
        'Welcome to the Posts App, your personal portal to a world of stories, shared experiences, and connections. Whether you are a seasoned blogger, an avid reader, or someone looking to connect with like-minded individuals, our application is designed to bring the world of posts and stories to your fingertips.',
        'With the Posts App, users can create accounts, log in, and embark on a journey of exploration. Once logged in, you will have access to a vast array of posts, each telling a unique tale or sharing valuable insights. Whether you are into travel stories, lifestyle blogs, or tech reviews, you will find a diverse range of content to engage with.',
        'But the Posts App is not just about reading; it is about connecting. Explore user profiles and about cards to learn more about the writers behind the posts. Discover shared interests, connect with fellow enthusiasts, and engage in meaningful discussions with those who share your passion.',
        'Join the growing community of readers and writers who have made the Posts App their go-to platform for storytelling and connecting. Whether you are here to share your own posts or discover new perspectives, our app is your doorway to a world of stories and connections. Download the Posts App today and start sharing, discovering, and connecting in a new and exciting way!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}posts-app-1${'.png'}`,
        `${this.screenshotsFolderPath}posts-app-2${'.png'}`,
        `${this.screenshotsFolderPath}posts-app-3${'.png'}`,
      ],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],
      seeLive: 'https://mypostsapp.netlify.app/login',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/postsApp',
    },
    {
      id: 11,
      title: 'Users App',
      description: [
        'Welcome to the Users App, your one-stop solution for seamless user management. Whether you are an administrator, a community organizer, or simply need an efficient way to manage user profiles, our application is designed to simplify the process and put you in control.',
        'With the Users App, you can effortlessly create and display user profiles complete with portraits. Each profile is customizable, allowing you to add and edit user details, including their portrait, name, contact information, and more. Gone are the days of sifting through paperwork or multiple spreadsheets; our app streamlines user management into a user-friendly interface.',
        'Need to update a users information or portrait? No problem. The Users App makes it easy to make changes in real-time, ensuring your records are always up-to-date. And if it is time to bid farewell to a user, our app offers a simple deletion feature, allowing you to remove profiles with ease while maintaining data integrity.',
        'Join the growing community of users who rely on the Users App for efficient and organized user management. Whether you are running a small organization or managing a large user database, our app has you covered. It is time to take control of your user profiles and make user management a breeze. Download the Users App today and experience the convenience of streamlined user management firsthand!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}card-app-1.png${'.png'}`,
        `${this.screenshotsFolderPath}card-app-2${'.png'}`,
      ],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],
      seeLive: 'https://majestic-melomakarona-c93ab4.netlify.app/users-page',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/UsersApp_Angular',
    },
    {
      id: 10,
      title: 'World Putting League',
      description: [
        'Welcome to the World Putting League, the epicenter of precision and passion in the world of golf. Dive into a unique golfing experience where putting prowess takes center stage and players from around the globe come together to showcase their skills.',
        'Our league is more than just a competition; it is a celebration of the art and science of putting. Whether you are a seasoned pro or a newcomer to the green, the World Putting League offers a platform for everyone to participate and compete. Our inclusive environment fosters camaraderie and sportsmanship while pushing the boundaries of what is possible on the putting green.',
        'Stay updated with the latest scores, rankings, and events as you immerse yourself in the thrilling world of putting. With a community of passionate golfers and enthusiasts, the World Putting League is where dreams are made, records are shattered, and lifelong friendships are forged.',
        'Join us on this journey where every putt counts, and the pursuit of perfection knows no bounds. Whether you are a golfer by heart or just intrigued by the allure of precision, the World Putting League welcomes you to experience golf in a whole new way. Get ready to roll with us and discover the magic of putting like never before.',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}wpl-1${'.png'}`,
        `${this.screenshotsFolderPath}wpl-2${'.png'}`,
      ],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],
      seeLive: 'https://unrivaled-duckanoo-78dd09.netlify.app/home',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/world-putting-league',
    },
    {
      id: 9,
      title: 'Speed Typing App',
      description: [
        'Welcome to the Speed Typing App, your ultimate tool for enhancing your typing proficiency. Whether you are a professional looking to boost productivity or a learner aiming to improve your keyboard prowess, our application is designed to help you achieve your typing goals with precision and efficiency.',
        'Our Speed Typing App offers a range of customizable features, allowing you to tailor your typing practice to your specific needs. You can choose your preferred timer, set word goals, and select difficulty levels to create a personalized typing experience. Whether you have just a few minutes to spare or want to embark on a more extensive typing session, our app adapts to your schedule.',
        'As you type, the Speed Typing App provides real-time feedback, tracking your speed, accuracy, and word count. It offers a library of words and phrases to challenge and engage your typing skills continually. With each session, you will find yourself typing faster, more accurately, and with greater confidence.',
        'Join the growing community of typists who have improved their skills with our Speed Typing App. Whether you are preparing for a job that requires lightning-fast typing or simply want to be more efficient with your daily tasks, our app is your ideal companion. Download it today and watch your typing abilities soar to new heights!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}speen-typing-1${'.png'}`,
        `${this.screenshotsFolderPath}speen-typing-2${'.png'}`,
      ],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],

      seeLive: 'https://chic-cat-2246b2.netlify.app/home',
      sourceCodeUrl:
        'https://github.com/Azat-Farmanyan/speed-typing-Angular-app',
    },
    {
      id: 8,
      title: 'Blot card game',
      description: [
        'Welcome to the Note Card Game Blots Score, your ultimate scoring companion for this classic and exciting card game. Whether youre a seasoned Blot player or just starting your journey, our application is designed to make keeping score a breeze and add a touch of elegance to your gaming experience.',
        'With our user-friendly and intuitive interface, you can focus on the game while effortlessly tracking your scores. No more fumbling with pen and paper or trying to remember whos winning; our app takes care of all the math for you. Simply input the scores, and let the Note Card Game Blots Score do the rest.',
        'But we dont stop at functionality; we believe in adding a touch of style to your gaming. Our app offers customizable themes and visually appealing scorecards to enhance your Blot gaming experience. Whether you prefer classic elegance or a more modern look, you can choose a theme that suits your taste.',
        'Join the Blot gaming community and elevate your card-playing sessions with our Note Card Game Blots Score app. Its not just about keeping score; its about enhancing your gaming moments with ease and sophistication. Download our app today and score your way to victory in style!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}blot-app-1${'.png'}`,
        `${this.screenshotsFolderPath}blot-app-2${'.png'}`,
      ],
      tools: ['Angular', 'HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Figma'],

      seeLive: 'https://steady-biscotti-58c415.netlify.app/blot',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/blot-app',
    },
    {
      id: 7,
      title: 'Weather app',
      description: [
        'Welcome to the Weather App, your reliable companion for staying informed about the ever-changing skies. With our user-friendly and intuitive application, you will have the power to access up-to-the-minute weather forecasts and stay one step ahead of Mother Nature.',
        'Our Weather App offers a seamless experience, providing you with accurate and detailed weather information at your fingertips. Whether you are planning a weekend getaway, scheduling outdoor activities, or simply want to know what to expect on your daily commute, our app has you covered',
        'Stay informed with real-time weather updates, temperature trends, precipitation forecasts, and more. With an easy-to-navigate interface and customizable features, you can tailor your weather experience to suit your needs. Whether you are a weather enthusiast or just want to know if you will need an umbrella, our Weather App is here to make your day brighter and more predictable.',
        'Join the millions of users who rely on our app for their daily weather updates. Embrace the convenience of knowing the forecast wherever you go, and be prepared for whatever the weather may bring. Download our Weather App today and stay ahead of the elements!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}weather-app-1${'.png'}`,
        `${this.screenshotsFolderPath}weather-app-2${'.png'}`,
        `${this.screenshotsFolderPath}weather-app-3${'.png'}`,
      ],
      tools: ['HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Angular', 'Figma'],
      seeLive: 'https://deft-liger-7c9069.netlify.app/home',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/weather-app',
    },
    {
      id: 6,
      title: 'English for kids',
      description: [
        'Introducing "English for Kids," an engaging and educational application specially crafted for children eager to embark on a journey of English language discovery. Designed with young learners in mind, our app offers two exciting modes that make language acquisition a joyful adventure.',
        'In the "Training Mode," children can dive into a world of knowledge and explore new words with interactive lessons and colorful visuals. Learning becomes a playful experience as kids absorb vocabulary, pronunciation, and basic language skills at their own pace. With our user-friendly interface and engaging content, young minds can build a solid foundation in English, setting them on a path to success.',
        'For those moments of delightful exploration, the "Game Mode" awaits. Here, children can put their newfound knowledge to the test in a thrilling game of picture guessing. Imagination and language skills come together as kids identify objects, animals, and more, all while reinforcing their English vocabulary in a fun and interactive way.',
        'English for Kids is more than an app; it is an educational companion that fosters a love for language and learning. Join us in this exciting journey, where children can expand their horizons, boost their confidence, and embark on a lifelong adventure of language and discovery. Give your child the gift of English education wrapped in fun and excitement today!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}english-2${'.png'}`,
        `${this.screenshotsFolderPath}english-1${'.png'}`,
        `${this.screenshotsFolderPath}english-3${'.png'}`,
        `${this.screenshotsFolderPath}english-4${'.png'}`,
        `${this.screenshotsFolderPath}english-5${'.png'}`,
      ],
      tools: ['HTML', 'SCSS', 'JavaScript', 'Figma'],
      seeLive:
        'https://azat-farmanyan.github.io/English-for-kids/English-for-kids/pages/main/#',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/English-for-kids',
    },
    {
      id: 5,
      title: 'Project Management System',
      description: [
        'Welcome to our Project Management System, a powerful application designed to assist individuals, teams, or groups of developers in achieving their goals efficiently and effectively. In todays fast-paced world, where collaboration and organization are key, our system offers a comprehensive solution to streamline your project management needs.',
        'In a highly competitive market, we understand that choices abound. Notable competitors like Trello, Jira, Redmine, Bitrix24, Yandex Tracker, Asana, GanttPro, and Github projects have all made their mark. However, our Project Management System stands out as a robust and user-friendly option, tailored to meet the specific needs of modern teams. With an array of features, intuitive interface, and customizable functionality, we aim to empower you to take control of your projects and drive success.',
        'Join the ranks of satisfied users who have discovered the benefits of our Project Management System. Explore the tools, enhance your productivity, and experience the difference for yourself. Whether you are a seasoned project manager or just embarking on your journey, we are here to help you reach your goals efficiently and with confidence. Welcome to the future of project management!',
      ],
      banner: `banner`,
      screenshots: [
        `${this.screenshotsFolderPath}proj-man-sys-1${'.png'}`,
        `${this.screenshotsFolderPath}proj-man-sys-2${'.png'}`,
        `${this.screenshotsFolderPath}proj-man-sys-3${'.png'}`,
      ],
      tools: ['HTML', 'SCSS', 'JavaScript', 'TypeScript', 'Angular', 'Figma'],
      seeLive: 'https://fascinating-douhua-c23dc0.netlify.app/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/rs-front-azat',
    },
    {
      id: 4,
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
