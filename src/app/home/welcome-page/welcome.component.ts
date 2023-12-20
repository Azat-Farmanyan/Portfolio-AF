import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('crossFade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false <=> true', animate('1000ms')),
      transition(':leave', [animate('1000ms', style({ opacity: 0 }))]), //<--animate to get opacity 0 in 1000ms
    ]),
  ],
})
export class WelcomePageComponent {
  socialLinksFolder = 'social-links-gray';

  linkedinImageSrc = `../../../assets/icons/${this.socialLinksFolder}/basil_linkedin-solid.svg`;
  githubImageSrc = `../../../assets/icons/${this.socialLinksFolder}/mdi_github.svg`;
  telegramImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ic_baseline-telegram.svg`;
  discordImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ic_baseline-discord.svg`;
  instagramImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ri_instagram-fill.svg`;
  facebookImageSrc = `../../../assets/icons/${this.socialLinksFolder}/gg_facebook.svg`;

  constructor(private router: Router) {}
  onMouseEnter(platform: string) {
    this.updateImageSrc(platform, 'social-links-orange');
  }

  onMouseLeave(platform: string) {
    this.updateImageSrc(platform, 'social-links-gray');
  }

  private updateImageSrc(platform: string, folder: string) {
    switch (platform) {
      case 'linkedin':
        this.linkedinImageSrc = `../../../assets/icons/${folder}/basil_linkedin-solid.svg`;
        break;
      case 'github':
        this.githubImageSrc = `../../../assets/icons/${folder}/mdi_github.svg`;
        break;
      case 'telegram':
        this.telegramImageSrc = `../../../assets/icons/${folder}/ic_baseline-telegram.svg`;
        break;
      case 'discord':
        this.discordImageSrc = `../../../assets/icons/${folder}/ic_baseline-discord.svg`;
        break;
      case 'instagram':
        this.instagramImageSrc = `../../../assets/icons/${folder}/ri_instagram-fill.svg`;
        break;
      case 'facebook':
        this.facebookImageSrc = `../../../assets/icons/${folder}/gg_facebook.svg`;
        break;
    }
  }

  navigateTo(path: string, fragment: string) {
    this.router.navigate([`/${path}`], { fragment: `${fragment}` });
  }
}
