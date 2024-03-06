import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tailwind-css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './tailwind-css.component.html',
  styleUrl: './tailwind-css.component.scss',
})
export class TailwindCssComponent implements OnInit {
  quantity = signal<number>(1);
  qtyAvailable = signal<number[]>([1, 2, 3, 4, 5, 6]);

  ngOnInit(): void {
    this.withOutSignal();
    this.withSignal();
  }

  qtyEffect = effect(() => console.log('Change Last: ', this.quantity()));

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

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
  }
}
