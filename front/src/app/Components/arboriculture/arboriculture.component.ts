import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-arboriculture',
  templateUrl: './arboriculture.component.html',
  styleUrls: ['./arboriculture.component.css']
})
export class ArboricultureComponent {
  arboricultureForm: FormGroup = this.fb.group({
    typeArbre: ['', Validators.required],
    nbArbre: ['', [Validators.required, Validators.min(1)]],
    stade: ['', Validators.required],
    hauteur: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  submitData() {
    if (this.arboricultureForm?.valid) {
      console.log(this.arboricultureForm?.value);
      // Handle form submission
      /*if(this.arbData.hauteur && this.arbData.stade && this.arbData.nbArbre && this.arbData.typeArbre){
        this.arbService.addInformation(this.arbData, 1, 2023).subscribe(
          response => {

            Swal.fire(response.toFixed(2).toString(),'Tonnes' , 'success')
          },
          error => {
            console.error('Error:', error);

          }
        );
      }*/
    }

  }
}
