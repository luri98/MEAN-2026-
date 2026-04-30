import { Component, input } from '@angular/core'

@Component({
    selector: 'app-spinner',
    standalone: true,
    template: `
        <div class="half-circle-spinner"
            [style.width]="size()"
            [style.height]="size()">
        <div class="circle circle-1"
            [style.border-top-color]="color()"
            [style.border-width]="'calc(' + size() + ' / 10)'"></div>

        <div class="circle circle-2"
            [style.border-bottom-color]="color()"
            [style.border-width]="'calc(' + size() + ' / 10)'"></div>
        </div>
    `,
    styles: [`
        .half-circle-spinner,
        .half-circle-spinner * {
            box-sizing: border-box;
        }

        .half-circle-spinner {
            border-radius: 100%;
            position: relative;
        }

        .half-circle-spinner .circle {
        content: "";
            border-color: transparent;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 100%;
            border-style: solid;
        }

        .half-circle-spinner .circle.circle-1 {
            animation: half-circle-spinner-animation 1s infinite;
        }

        .half-circle-spinner .circle.circle-2 {
            animation: half-circle-spinner-animation 1s infinite alternate;
        }

        @keyframes half-circle-spinner-animation {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
  `]
})

export class Spinner {
    color = input<string>('white')
    size = input<string>('20px')
}