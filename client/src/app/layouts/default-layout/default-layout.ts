import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { Navbar } from '../../layout/navbar/navbar'
import { Footer } from '../../layout/footer/footer'

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './default-layout.html'
})
export class DefaultLayout {}