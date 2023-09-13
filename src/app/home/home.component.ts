import { RouteService } from './../services/route.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  scrollTop = false;
  prevPath: string = '';
  prevPathSubs: Subscription;

  clickedCard: number;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.prevPathSubs = this.routeService.previousPath.subscribe((prevPath) => {
      this.prevPath = prevPath;

      console.log(this.prevPath);

      if (this.prevPath.includes('details')) {
        const cardId = +this.prevPath.split('/')[2];
        if (cardId) {
          this.clickedCard = cardId;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToProjects();
  }

  scrollToProjects() {
    if (this.prevPath.includes('details')) {
      // `#${this.openedCardId}`
      const projectsElement = this.el.nativeElement.querySelector('#projects');
      if (projectsElement) {
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          projectsElement.offsetTop
        );
      }
    }
  }
  ngOnDestroy(): void {
    if (this.prevPathSubs) this.prevPathSubs.unsubscribe();
  }
}
