import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../Service/payment.service';
import { ReceiptService } from '../../services/receipt.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css'],
  animations: [
    trigger('growTree', [
      state(
        'void',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('void => active', [animate('1.5s ease-out')]),
    ]),
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        })
      ),
      state(
        'active',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => active', [animate('0.8s 0.5s ease-out')]),
    ]),
    trigger('flyIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(-50px)',
        })
      ),
      state(
        'active',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => active', [animate('0.6s ease-out')]),
    ]),
  ],
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
  ecoBenefits: { icon: string; label: string; value: string }[] = [];
  totalCost: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private receiptService: ReceiptService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'active';
    }, 300);
    this.status = 'success';

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const paymentIntentId = params['id'];
      const redirectStatus = params['redirect_status'];
      const OrderNumber = +params['orderNumber'];
      this.amount = Math.floor(+params['totalQuantity']);
      this.totalCost = params['totalPrice'];

      this.orderNumber = 'ECO-' + Math.floor(OrderNumber).toString();

      this.carbonOffset = parseFloat((this.amount * 10000).toFixed(2));
      this.treeCount = Math.floor((this.amount * 1000) / 25);
      console.log('totalCost:' + this.totalCost);

      this.ecoBenefits = [
        {
          icon: 'co2',
          label: 'CO₂ compensated',
          value: `${this.carbonOffset} kg`,
        },
        {
          icon: 'forest',
          label: 'Planted trees',
          value: `${this.treeCount}`,
        },
        {
          icon: 'water',
          label: 'Economized water',
          value: `${Math.floor(this.amount * 3000)} L`,
        },
        {
          icon: 'energy',
          label: 'Renewable energy',
          value: `${Math.floor(this.amount * 0.8 * 1000)} kWh`,
        },
      ];

      if (!paymentIntentId) {
        this.handleError('Aucun identifiant de paiement trouvé.');
        return;
      }
    });
  }

  handleError(errorMessage: string): void {
    this.status = 'error';
    this.message = errorMessage;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  share(platform: string) {
    let url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com?share=www.mysite.com/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  downloadReceipt(): void {
    const receiptData = {
      orderNumber: this.orderNumber,
      totalCost: this.totalCost,
      amount: this.amount,
      carbonOffset: this.carbonOffset,
      treeCount: this.treeCount,
      ecoBenefits: this.ecoBenefits,
      date: this.currentDate,
    };

    // Use the receipt service to generate and download the receipt
    this.receiptService.generateReceiptPDF(receiptData);

    // Optional: Also provide HTML download
    // this.receiptService.downloadReceiptAsFile(receiptData);
  }
}
