import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface ISlide {
  id: string;
  image: string;
  url: string;
  priority: number;
}

const mock_slides: ISlide[] = [
  {
    id: '1',
    image: 'https://wallpapersmug.com/download/1280x720/11a3dc/firewatch-game-sunset-artwork.jpg',
    url: 'https://wallpapersmug.com/download/1280x720/11a3dc/firewatch-game-sunset-artwork.jpg',
    priority: 1
  },
  {
    id: '2',
    image: 'https://i.pinimg.com/originals/86/28/3f/86283fa819607d763e5161b82922ca9e.jpg',
    url: 'https://i.pinimg.com/originals/86/28/3f/86283fa819607d763e5161b82922ca9e.jpg',
    priority: 1
  },
  {
    id: '3',
    image: 'https://images.wallpaperscraft.com/image/single/mountains_moon_forest_139359_1280x720.jpg',
    url: 'https://images.wallpaperscraft.com/image/single/mountains_moon_forest_139359_1280x720.jpg',
    priority: 3
  },
  {
    id: '4',
    image: 'https://www.starfieldguide.com/wp-content/uploads/2022/06/first-steps-1280x720-1.jpeg',
    url: 'https://www.starfieldguide.com/wp-content/uploads/2022/06/first-steps-1280x720-1.jpeg',
    priority: 2
  },
  {
    id: '5',
    image: 'https://archive.org/download/resort_bar_ocean-wallpaper-1280x720/resort_bar_ocean-wallpaper-1280x720.jpg',
    url: 'https://archive.org/download/resort_bar_ocean-wallpaper-1280x720/resort_bar_ocean-wallpaper-1280x720.jpg',
    priority: 2
  }
]

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  public slides$ = new BehaviorSubject<ISlide[]>([]);

  constructor() {
    this.getSlides().subscribe((v) => this.slides$.next(v));
  }

  public getSlides() {
    return of(mock_slides);
  }
}
