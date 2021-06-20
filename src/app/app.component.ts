import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { of, Subscription, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HuaLinhQuang_17DH111099';

  loadedFeature = 'recipe';
  event$ = new BehaviorSubject<string>('/login');
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.event$.next(event.url);
        console.log(event.url);
      }
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
  ngOnDestroy() {
    this.event$.subscribe().unsubscribe();
  }
}
