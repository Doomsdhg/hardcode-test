import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlidesService } from './services/slides.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hardcode-test';

  public slides$ = this.slides_service.slides$;

  constructor(public readonly slides_service: SlidesService) {}
}
