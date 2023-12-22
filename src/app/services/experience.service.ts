import { Injectable } from '@angular/core';

export interface Experience {
  date: {
    from: string;
    to: string;
    duration: string;
  };
  title: string;
  company: string;
  page: string;
  description: string;
  companyLogo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor() {}

  private experience: Experience[] = [
    {
      date: {
        from: 'January 2023',
        to: 'Till now',
        duration: '1 year',
      },
      title: 'Angular Developer',
      company: 'CyberiaSoft',
      page: 'https://www.cyberiasoft.com/',
      description:
        '- Proficient in HTML, CSS, SCSS, JavaScript, TypeScript, and Angular, responsible for developing and enhancing web-based store management systems. - Collaborated with cross-functional teams to ensure compliance with business requirements, utilizing GitLab for version control and integrating REST APIs for data exchange. - Employed DevExtreme and Frontend JS from DevExtreme to create an interactive and visually appealing user interface, applying RxJS and JSON for efficient data processing. - Implemented responsive design methods to ensure optimal performance on various devices, enhancing user satisfaction. - Followed Agile methodology for efficient feature delivery, using VS Code as the development environment and DevExpress for additional tools and libraries. - Conducted testing and optimization to ensure the quality and performance of systems. - Provided technical support and training to end users, ensuring their effective utilization of web-based store management systems. - Stayed abreast of industry trends for continuous system improvement and maintaining an innovative approach.',
      companyLogo: '',
    },
    {
      date: {
        from: 'June 2022',
        to: 'may 2023',
        duration: '1 year',
      },
      title: 'Angular Developer',
      company: 'GeoAlphaSolution',
      page: 'https://www.geoalphasolutions.com/',
      description:
        'Contributed significantly to the development of two distinct projects: 1) FairContent.media: Played a key role in creating the online marketplace FairContent.media, enabling users to buy and sell various goods, including books, videos, music, and documents. [Website: https://www.faircontent.media/home] 2) Swiftness: Led efforts in developing Swiftness, a digital platform revolutionizing the pension savings market. [Website: http://www.swiftness.co.il/] - Utilized skills in HTML, CSS, SCSS, JavaScript, TypeScript, and Angular to create user-friendly and responsive interfaces for both projects, significantly enhancing the overall user experience. - Collaborated closely with interdisciplinary teams, ensuring alignment with project goals and business requirements. Used GitHub for version control and REST API integration for efficient data exchange, harnessing the power of RxJS and JSON for seamless data processing. - Demonstrated adaptability, successfully working on diverse projects in various industries, showcasing a flexible skill set and the ability to learn and adapt quickly to changing conditions. - Maintained a high level of innovation and efficiency, staying abreast of the latest trends in Angular development. Used development tools such as VS Code for smooth and productive workflows. Applied object-oriented programming (OOP) principles and ES6 functionality to create robust and maintainable code. - Additionally, used Figma for collaborative design work and integrated VisualStudio and VS Code into the development process to ensure code quality and consistency ',
      companyLogo: '',
    },
    {
      date: {
        from: 'February 2022',
        to: 'october 2022',
        duration: '9 months',
      },
      title: 'Angular Developer',
      company: 'Emap - RsSchool',
      page: 'https://www.epam.com/',
      description:
        '-Participated in an intensive Front-End development program at Emap - RsSchool, initiating my immersion into the world of web development. Mastered a comprehensive skill set, including HTML, CSS, JavaScript, TypeScript, and Angular, laying a solid foundation for modern web development. Thrived in a demanding and rigorous educational environment with a high attrition rate, where only 46 out of 600 participants demonstrated commitment, perseverance, and completed the program. Proud to be among the dedicated individuals who achieved this significant milestone. Effectively applied acquired knowledge and skills in real-world projects, gaining practical experience in designing and developing user-friendly web interfaces. Attained significant success, receiving a completion certificate confirming my expertise in Front-End development and validating my commitment to excellence in this field. Kept abreast of the latest trends and best practices in web development, ensuring my stay at the forefront of this constantly evolving field. Utilized tools such as Figma for web design, Git and Github for version control, REST API for data integration, and RxJS for efficient data processing. Applied JSON for data exchange and optimized code using VS Code and VisualStudio. Proficiently used Chrome DevTools for debugging and enhancing web applications.',
      companyLogo: '',
    },
    {
      date: {
        from: 'June 2019',
        to: 'may 2021',
        duration: '2 years',
      },
      title: 'Graphic Designer',
      company: 'Apacer Technology Inc.',
      page: 'https://www.apacer.com',
      description:
        '- Specialized in creating eyecatching advertising banners tailored specifically for social media platforms. - Collaborated closely with marketing teams to ensure effective product messaging through visually appealing content. - Adapted designs to meet the unique requirements of various social media platforms, optimizing their visual impact and ensuring a seamless user experience. - Conducted A/B testing and made adjustments based on data, continually improving engagement levels and click-through rates, thereby enhancing the overall effectiveness of advertising campaigns. - Made a significant contribution to the companys marketing efforts by crafting visually appealing and conversion-focused advertising materials for social media campaigns, utilizing design software such as Adobe Photoshop, Adobe Illustrator, and Figma.',
      companyLogo: '',
    },
    {
      date: {
        from: 'May 2018',
        to: 'august 2019',
        duration: '1 year 4 months',
      },
      title: 'Graphic Designer',
      company: 'Bet888win',
      page: 'https://bet888win.net',
      description:
        '- Created dynamic footballthemed advertising banners specifically tailored for social media platforms to promote matches and events. - Collaborated closely with marketing teams to ensure the timely creation of compelling content that resonated with the target audience. - Utilized design skills with tools such as Adobe Photoshop, Adobe Illustrator, and Figma to craft visually appealing banners that encouraged higher user engagement. - Adapted and optimized designs to meet the specific requirements of various social media platforms, ensuring effective reach and engagement with the target audience.',
      companyLogo: '',
    },
  ];

  getExperience(): Experience[] {
    return this.experience;
  }
}
