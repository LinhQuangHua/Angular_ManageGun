import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HuaLinhQuang_17DH111099';

  loadedFeature = 'recipe';
  href: string;
  event$
  constructor(private router: Router) { }

  ngOnInit() {
    this.event$
      = this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
              this.href = event.url;
              console.log(event.url);
            }
          });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
  ngOnDestroy() {
    this.event$.unsubscribe();
  }
}
