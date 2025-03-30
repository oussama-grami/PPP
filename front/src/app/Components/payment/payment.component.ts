import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../Service/cart-service.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cartItems = this.cartService.getItems();

  submitted:boolean = false;
  public checkoutForm!: FormGroup;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutForm = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      address: new FormControl(''),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]), // Assumed 5 digits postal code
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm!.valid) {
      console.log(this.checkoutForm!.value);
    } else {
      console.log('Form is not valid!');
    }
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
