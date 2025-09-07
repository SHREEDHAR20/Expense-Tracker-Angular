import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  logout() {
  window.location.href = '/';  // Redirect to homepage
}

  
}
