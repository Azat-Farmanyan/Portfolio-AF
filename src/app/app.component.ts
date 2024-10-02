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
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.routerSubs = this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((event: any[]) => {
        const previuosPath = event[0].urlAfterRedirects;
        this.routeService.previousPath.next(previuosPath);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubs) this.routerSubs.unsubscribe();
  }
}
