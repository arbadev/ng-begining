import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  ngOnInit(): void {
    this.startCountdown()
  }
  ngOnDestroy(): void {
    this.clearTimeout()
  }
  ngOnChanges(changes): void {
    console.log('nuevo init', changes.init.currentValue)
    this.startCountdown()
  }

  @Output() onDecrease = new EventEmitter<Number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init = null;
  public counter = 0;
  private countdownTimeRef:any = null;

  constructor() { }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout()
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimeRef = setTimeout(() => {
      this.counter = this.counter -1;
      this.processCountdown();
    }, 1000)
  }

  private clearTimeout() {
    if (this.countdownTimeRef) {
      clearTimeout(this.countdownTimeRef);
      this.countdownTimeRef = null;
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter)
    console.log('count is', this.counter);

    if(this.counter === 0) {
      this.onComplete.emit()
      console.log('no mas counter')
    } else {
      this.doCountdown()
    }
  }
}
