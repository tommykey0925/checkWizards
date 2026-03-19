import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GryffindorService } from '../gryffindor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <span class="hero-icon">&#9733;</span>
        <h1>Welcome to the<br /><span class="highlight">Wizarding World</span></h1>
        <p class="subtitle">Discover random wizards from the Harry Potter universe</p>
        <a routerLink="/wizard" class="cta-btn" (click)="svc.setWizard()">Get Started</a>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
    }
    .hero-content { text-align: center; }
    .hero-icon {
      font-size: 4rem;
      color: #ffd700;
      display: block;
      margin-bottom: 1.5rem;
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
      margin: 0 0 1rem;
    }
    .highlight {
      background: linear-gradient(135deg, #ffd700, #f0a500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 2rem;
    }
    .cta-btn {
      display: inline-block;
      padding: 0.85rem 2.5rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #ffd700, #f0a500);
      color: #1a1a2e;
      font-size: 1.05rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
      box-shadow: 0 4px 16px rgba(255, 215, 0, 0.25);
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(255, 215, 0, 0.35);
    }
  `]
})
export class HomeComponent {
  constructor(public svc: GryffindorService) {}
}
