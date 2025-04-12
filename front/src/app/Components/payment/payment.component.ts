import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../Service/cart-service.service";
import {RoutesEnum} from "../../enumerations/Routes.enum";
import {PaymentService} from "../../Service/payment.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

enum PaymentState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  cartItems = this.cartService.getItems();
  stripe: any;
  elements: any;
  paymentElement: any;
  submitted: boolean = false;

  paymentState: PaymentState = PaymentState.IDLE;
  errorMessage: string = '';

  public checkoutForm!: FormGroup;
  protected readonly RoutesEnum = RoutesEnum;

  get PaymentState() {
    return PaymentState;
  }

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.valid) {
      this.paymentState = PaymentState.LOADING;
      this.errorMessage = '';

      try {
        const payload = {
          amount: Math.round(this.getTotalPrice() * 100),
          currency: 'eur',
          description: 'Achat sur votre application',
          companyOwnerId: 7,
          cartLineIds: this.cartItems.map(item => item.id),
          customerInfo: this.checkoutForm.value,
          totalPrice:this.getTotalPrice().toString(),
        };
        console.log(payload);

        const response = await firstValueFrom(this.paymentService.createPaymentIntent(payload));
        this.stripe =  await Stripe(response.publicKey);

        this.elements = this.stripe.elements({
          clientSecret: response.clientSecret,
          appearance: {
            theme: 'stripe',
          },
        });

        this.paymentElement = this.elements.create('payment');
        this.paymentElement.mount('#payment-element');

        document.getElementById('stripe-payment-overlay')!.style.display = 'flex';

        this.paymentState = PaymentState.IDLE;

      } catch (error) {
        this.paymentState = PaymentState.ERROR;
        this.errorMessage = 'Une erreur est survenue lors de la préparation du paiement.';
        console.error('Erreur préparation:', error);
      }
    } else {
      console.log('Le formulaire n\'est pas valide!');
    }
  }

  async handlePayment() {
    this.paymentState = PaymentState.LOADING;
    this.errorMessage = '';

    if (!this.stripe || !this.elements) {
      this.paymentState = PaymentState.ERROR;
      this.errorMessage = 'Erreur d\'initialisation de Stripe. Veuillez recharger la page.';
      return;
    }

    try {
      const paymentElement = this.elements.getElement('payment');
      console.log(this.elements);

      if (!paymentElement) {
        throw new Error('L\'élément de paiement n\'est pas disponible');
      }

      const { error, paymentIntent } = await this.stripe?.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-confirmation',
        },
        redirect: 'if_required',
      });

      if (error) {
        this.paymentState = PaymentState.ERROR;
        this.errorMessage = error.message || 'Une erreur est survenue lors du paiement.';
        console.error('Erreur Stripe:', error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log("Paiement réussi, statut:", paymentIntent.status);

        try {
          await firstValueFrom(this.paymentService.confirmPaymentSuccess(paymentIntent.id));

          this.paymentState = PaymentState.SUCCESS;
          this.cartService.clearCart();

          setTimeout(() => {
            this.router.navigate(['/payment-confirmation'], {
              queryParams: {
                id: paymentIntent.id,
                redirect_status: paymentIntent.status
              }
            });
          }, 1500);

        } catch (confirmError: any) {
          console.error('Erreur de confirmation détaillée:', confirmError);

          // Gérer les erreurs de confirmation
          if (confirmError.status === 200) {
            // Success malgré l'erreur HTTP
            this.paymentState = PaymentState.SUCCESS;
            this.cartService.clearCart();
            setTimeout(() => {
              this.router.navigate(['/payment-confirmation/']);
            }, 1500);
          } else {
            this.paymentState = PaymentState.ERROR;
            this.errorMessage = 'Le paiement a réussi, mais une erreur est survenue lors de la confirmation.';
          }
        }
      } else {
        this.paymentState = PaymentState.ERROR;
        this.errorMessage = 'Statut de paiement inattendu: ' + (paymentIntent ? paymentIntent.status : 'inconnu');
      }
    } catch (error: any) {
      console.error("Erreur technique lors du traitement du paiement:", error);
      this.paymentState = PaymentState.ERROR;
      this.errorMessage = 'Une erreur technique est survenue lors du traitement du paiement.';
    }
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
