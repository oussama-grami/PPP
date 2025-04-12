import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../../Service/payment.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css'],
  animations: [
    trigger('growTree', [
      state('void', style({
        height: '0',
        opacity: 0
      })),
      state('active', style({
        height: '*',
        opacity: 1
      })),
      transition('void => active', [
        animate('1.5s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => active', [
        animate('0.8s 0.5s ease-out')
      ])
    ]),
    trigger('flyIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-50px)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => active', [
        animate('0.6s ease-out')
      ])
    ])
  ]
})
export class PaymentConfirmationComponent implements OnInit {
  status: 'success' | 'error' | 'processing' = 'processing';
  currentDate: Date = new Date();
  message: string = '';
  animationState: string = 'void';
  orderNumber: string = '';
  amount: number = 0;
  carbonOffset: number = 0;
  treeCount: number = 0;
  ecoBenefits: { icon: string, label: string, value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Start animations after a short delay
    setTimeout(() => {
      this.animationState = 'active';
    }, 300);

    this.route.queryParams.subscribe(params => {
      const paymentIntentId = params['id'];
      const redirectStatus = params['redirect_status'];

      // Generate random order number
      this.orderNumber = 'ECO-' + Math.floor(10000000 + Math.random() * 90000000).toString();

      // Random amount for demo (in real app, this would come from the backend)
      this.amount = Math.floor(Math.random() * 500) + 50;

      // Calculate environmental impact (for demo purposes)
      this.carbonOffset = parseFloat((this.amount * 0.05).toFixed(2));
      this.treeCount = Math.floor(this.amount / 25);

      // Environmental benefits
      this.ecoBenefits = [
        {
          icon: 'co2',
          label: 'CO₂ compensé',
          value: `${this.carbonOffset} kg`
        },
        {
          icon: 'forest',
          label: 'Arbres plantés',
          value: `${this.treeCount}`
        },
        {
          icon: 'water',
          label: 'Eau économisée',
          value: `${Math.floor(this.amount * 3)} L`
        },
        {
          icon: 'energy',
          label: 'Énergie renouvelable',
          value: `${Math.floor(this.amount * 0.8)} kWh`
        }
      ];

      if (!paymentIntentId) {
        this.handleError('Aucun identifiant de paiement trouvé.');
        return;
      }

      if (redirectStatus === 'succeeded') {
        this.confirmPayment(paymentIntentId);
      } else {
        this.handleError('Le paiement a échoué. Veuillez réessayer.');
      }
    });
  }

  confirmPayment(paymentIntentId: string): void {
    this.paymentService.confirmPaymentSuccess(paymentIntentId).subscribe(
      response => {
        this.status = 'success';
        this.message = 'Paiement réussi! Votre commande a été confirmée.';
      },
      error => {
        // For demo purposes, let's still show success if there's a 200 status
        if (error.status === 200) {
          this.status = 'success';
          this.message = 'Paiement réussi! Votre commande a été confirmée.';
        } else {
          this.handleError('Erreur lors de la confirmation du paiement.');
        }
      }
    );
  }

  handleError(errorMessage: string): void {
    this.status = 'error';
    this.message = errorMessage;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  viewOrder(): void {
    // In a real app, this would navigate to the order details page
    this.router.navigate(['/']);
  }
  share(platform:string) {
    let url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com?share=www.mysite.com/?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  downloadReceipt(): void {
    // In a real app, this would download a receipt PDF
    alert('Téléchargement du reçu en cours...');
  }


}
