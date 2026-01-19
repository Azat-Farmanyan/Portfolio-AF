import { RouteService } from './services/route.service';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RoutesRecognized,
  RouterOutlet,
} from '@angular/router';
import { Subscription, filter, pairwise, take, tap } from 'rxjs';
import { ProjectsService } from './services/projects.service';
import { TranslateService } from '@ngx-translate/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Portfolio-AF';
  routerSubs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private routeService: RouteService,
    private translateService: TranslateService,
    private seoService: SeoService
  ) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Инициализация SEO
    this.seoService.init();

    // Добавление структурированных данных
    this.seoService.addStructuredData(this.seoService.getPersonStructuredData(), 'structured-data-person');
    this.seoService.addStructuredData(this.seoService.getPortfolioStructuredData(), 'structured-data-portfolio');

    this.routerSubs = this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((event: any[]) => {
        const previuosPath = event[0].urlAfterRedirects;
        this.routeService.previousPath.next(previuosPath);
      });

    this.sendTestEmail();
  }

  ngOnDestroy(): void {
    if (this.routerSubs) this.routerSubs.unsubscribe();
  }

  sendTestEmail() {
    const isLocalhost = location.hostname === 'localhost';

    if (isLocalhost) {
      console.log('Запуск на localhost — отправка email пропущена.');
      return;
    }

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const currentTime = new Date().toLocaleString();

        const visitorText = `
        🌐 Уведомление о новом визите на сайт

        🕒 Время: ${currentTime}

        🌍 IP-адрес: ${data.ip}
        🏙️ Город: ${data.city}
        🗺️ Регион: ${data.region}
        🗺️ Код региона: ${data.region_code}
        🇷🇺 Страна: ${data.country_name}
        🇷🇺 Код страны: ${data.country_code}
        🌍 Континент: ${data.continent_name}
        📮 Почтовый индекс: ${data.postal}
        ⏰ Временная зона: ${data.timezone}
        📅 Смещение UTC: ${data.utc_offset}
        📞 Телефонный код страны: ${data.country_calling_code}
        💰 Валюта: ${data.currency}
        🗣️ Языки: ${data.languages}
        🏢 Организация (провайдер): ${data.org}
        🔢 ASN (номер автономной системы): ${data.asn}
        📡 Сеть: ${data.network}

        🧭 Браузер пользователя: ${navigator.userAgent}
        🌐 Язык браузера: ${navigator.language}
        🖥️ Платформа: ${navigator.platform}
        ⚙️ Кол-во ядер CPU: ${navigator.hardwareConcurrency || 'неизвестно'}
        🧑‍💻 Производитель браузера: ${navigator.vendor}

        🔗 Откуда пришёл (Referrer): ${document.referrer || 'неизвестно'}
          `;

        const templateParams = { message: visitorText };

        emailjs
          .send(
            'service_3cxa21c', // Твой сервис
            'template_jawmbjg', // Твой шаблон (см. ниже)
            templateParams,
            'rOMe2slLxXTWyfjfQ' // Твой публичный ключ
          )
          .then((res) => {
            // console.log('Visitor info sent successfully:', res);
          })
          .catch((err) => {
            // console.error('Failed to send visitor info:', err);
          });
      })
      .catch((err) => {
        console.error('Failed to fetch visitor info:', err);
      });
  }
}
