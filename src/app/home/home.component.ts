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

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    // this.routerSubs = this.router.events
    //   .pipe(
    //     filter((e: any) => e instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((event: any[]) => {
    //     const previuosPath = event[0].urlAfterRedirects;
    //     console.log(event[0].urlAfterRedirects);
    //   });

    this.prevPathSubs = this.routeService.previousPath.subscribe((prevPath) => {
      this.prevPath = prevPath;
    });
  }

  ngAfterViewInit() {
    this.scrollToProjects();
  }

  scrollToProjects() {
    if (this.prevPath.includes('details')) {
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
  // @HostListener('window:scroll', ['$event'])
  // onWindowsScroll(event: Event) {
  //   const scrollTop =
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop;
  //   if (scrollTop === 0) {
  //     this.scrollTop = true;
  //   } else {
  //     this.scrollTop = false;
  //   }
  // }
}
