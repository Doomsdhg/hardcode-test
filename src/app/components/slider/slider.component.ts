import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, map, timer } from 'rxjs';
import { ISlide } from 'src/app/services/slides.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  @Input() public set slides(input_slides: ISlide[]) {
    const sorted_slides: ISlide[] = [];
    const priorities = new Set<number>(input_slides.map((s) => s.priority).sort((a, b) => a - b));

    priorities.forEach((priority) => {
      if (sorted_slides.length === 0) {
        sorted_slides.push(...input_slides.filter((s) => s.priority === priority));
      } else {
        for (let i = 0; i < sorted_slides.length; i++) {
          sorted_slides[i].priority < priority ? sorted_slides.splice(i + 1, 0, ...input_slides.filter((s) => s.priority === priority)) : null;
        }
      }
    });

    this._input_slides = input_slides;
    this._slides = sorted_slides;
  };

  public get slides() {
    return this._slides;
  }

  public get input_slides() {
    return this._input_slides;
  }

  @Input() public slide_display_time: number = 5000;

  private _slides: ISlide[] = [];
  private _input_slides: ISlide[] = [];

  private destroy_ref = inject(DestroyRef);

  public current_slide$ = new ReplaySubject<ISlide>(1);

  constructor() {}

  public ngOnInit(): void {
    timer(0, this.slide_display_time)
      .pipe(
        takeUntilDestroyed(this.destroy_ref),
        map((i) => this.slides[i % this.slides.length])
      )
      .subscribe((v) => this.current_slide$.next(v));
  }
}
