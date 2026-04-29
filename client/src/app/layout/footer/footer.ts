import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  routes = [
    {
      name: 'Proizvodi',
      href: '/proizvodi',
      svg: ''
    },
    {
      name: 'Kontakt',
      href: '/kontakt',
      svg: ''
    }
  ]

}
