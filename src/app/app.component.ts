import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quantity = signal<number>(0);
  ngOnInit(): void {
    this.withOutSignal();
    this.withSignal();
    //effect(() => console.log('Change: ', this.quantity));
  }

  withOutSignal() {
    let x = 5;
    let y = 3;
    let z = x + y;

    x = 10;
    console.log(z);
  }

  withSignal() {
    let x = signal(5);
    let y = signal(3);
    let z = computed(() => x() + y());
    console.log('With signals no set', z());
    x.set(10);
    console.log('With signals', z());
  }

  onSelected(qty: number) {
    this.quantity.set(qty);
    console.log('Quantity with set: ', this.quantity());

    this.quantity.update((qty) => qty * 2);
    console.log('Quantity with update: ', this.quantity());
  }
}
