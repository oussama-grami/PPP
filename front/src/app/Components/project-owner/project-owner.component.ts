import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoutesEnum} from '../../enumerations/Routes.enum';
import {ProjectOwnerService} from '../../Service/project-owner.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger,} from '@angular/animations';

@Component({
  selector: 'app-project-owner',
  templateUrl: './project-owner.component.html',
  styleUrls: ['./project-owner.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          height: 0,
          padding: 0,
        })
      ),
      transition('void <=> *', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ProjectOwnerComponent {
  projectForm: FormGroup = new FormGroup({});
  fileError: string | null = null;
  submitSuccess = false;
  submitError: string | null = null;
  isSubmitting = false;
  filteredCountries: any[] = [];

  // Image upload related properties
  bannerImage: File | null = null;
  mapImage: File | null = null;
  urlImage: File | null = null;
  bannerImagePreview: string = '';
  mapImagePreview: string = '';
  urlImagePreview: string = '';
  availableObjectiveImages: string[] = [
    '/assets/img/objectif1.jpg',
    '/assets/img/objectif2.jpg',
    '/assets/img/objectif3.jpg',
    '/assets/img/objectif4.jpg',
    '/assets/img/objectif5.jpg',
    '/assets/img/objectif6.jpg',
    '/assets/img/objectif7.jpg',
    '/assets/img/objectif8.jpg',
    '/assets/img/objectif9.jpg',
    '/assets/img/objectif10.jpg',
    '/assets/img/objectif11.jpg',
    '/assets/img/objectif12.jpg',
    '/assets/img/objectif13.jpg',
    '/assets/img/objectif14.jpg',
    '/assets/img/objectif15.jpg',
    '/assets/img/objectif16.jpg',
    '/assets/img/objectif17.jpg',
  ];

  selectedObjectiveImages: string[] = [];

  countries = [
    {name: 'Afghanistan', iconClass: 'flag-icon-af', code: '+93'},
    {name: 'Albania', iconClass: 'flag-icon-al', code: '+355'},
    {name: 'Algeria', iconClass: 'flag-icon-dz', code: '+213'},
    {name: 'Andorra', iconClass: 'flag-icon-ad', code: '+376'},
    {name: 'Angola', iconClass: 'flag-icon-ao', code: '+244'},
    {name: 'Argentina', iconClass: 'flag-icon-ar', code: '+54'},
    {name: 'Armenia', iconClass: 'flag-icon-am', code: '+374'},
    {name: 'Australia', iconClass: 'flag-icon-au', code: '+61'},
    {name: 'Austria', iconClass: 'flag-icon-at', code: '+43'},
    {name: 'Azerbaijan', iconClass: 'flag-icon-az', code: '+994'},
    {name: 'Bahrain', iconClass: 'flag-icon-bh', code: '+973'},
    {name: 'Bangladesh', iconClass: 'flag-icon-bd', code: '+880'},
    {name: 'Belarus', iconClass: 'flag-icon-by', code: '+375'},
    {name: 'Belgium', iconClass: 'flag-icon-be', code: '+32'},
    {name: 'Belize', iconClass: 'flag-icon-bz', code: '+501'},
    {name: 'Benin', iconClass: 'flag-icon-bj', code: '+229'},
    {name: 'Bhutan', iconClass: 'flag-icon-bt', code: '+975'},
    {name: 'Bolivia', iconClass: 'flag-icon-bo', code: '+591'},
    {name: 'Bosnia and Herzegovina', iconClass: 'flag-icon-ba', code: '+387'},
    {name: 'Botswana', iconClass: 'flag-icon-bw', code: '+267'},
    {name: 'Brazil', iconClass: 'flag-icon-br', code: '+55'},
    {name: 'Brunei', iconClass: 'flag-icon-bn', code: '+673'},
    {name: 'Bulgaria', iconClass: 'flag-icon-bg', code: '+359'},
    {name: 'Burkina Faso', iconClass: 'flag-icon-bf', code: '+226'},
    {name: 'Burundi', iconClass: 'flag-icon-bi', code: '+257'},
    {name: 'Cambodia', iconClass: 'flag-icon-kh', code: '+855'},
    {name: 'Cameroon', iconClass: 'flag-icon-cm', code: '+237'},
    {name: 'Canada', iconClass: 'flag-icon-ca', code: '+1'},
    {name: 'Cape Verde', iconClass: 'flag-icon-cv', code: '+238'},
    {
      name: 'Central African Republic',
      iconClass: 'flag-icon-cf',
      code: '+236',
    },
    {name: 'Chad', iconClass: 'flag-icon-td', code: '+235'},
    {name: 'Chile', iconClass: 'flag-icon-cl', code: '+56'},
    {name: 'China', iconClass: 'flag-icon-cn', code: '+86'},
    {name: 'Colombia', iconClass: 'flag-icon-co', code: '+57'},
    {name: 'Comoros', iconClass: 'flag-icon-km', code: '+269'},
    {
      name: 'Congo (Congo-Brazzaville)',
      iconClass: 'flag-icon-cg',
      code: '+242',
    },
    {name: 'Costa Rica', iconClass: 'flag-icon-cr', code: '+506'},
    {name: 'Croatia', iconClass: 'flag-icon-hr', code: '+385'},
    {name: 'Cuba', iconClass: 'flag-icon-cu', code: '+53'},
    {name: 'Cyprus', iconClass: 'flag-icon-cy', code: '+357'},
    {
      name: 'Czechia (Czech Republic)',
      iconClass: 'flag-icon-cz',
      code: '+420',
    },
    {name: 'Denmark', iconClass: 'flag-icon-dk', code: '+45'},
    {name: 'Djibouti', iconClass: 'flag-icon-dj', code: '+253'},
    {name: 'Dominica', iconClass: 'flag-icon-dm', code: '+1'},
    {name: 'Dominican Republic', iconClass: 'flag-icon-do', code: '+1'},
    {
      name: 'East Timor (Timor-Leste)',
      iconClass: 'flag-icon-tl',
      code: '+670',
    },
    {name: 'Ecuador', iconClass: 'flag-icon-ec', code: '+593'},
    {name: 'Egypt', iconClass: 'flag-icon-eg', code: '+20'},
    {name: 'El Salvador', iconClass: 'flag-icon-sv', code: '+503'},
    {name: 'Equatorial Guinea', iconClass: 'flag-icon-gq', code: '+240'},
    {name: 'Eritrea', iconClass: 'flag-icon-er', code: '+291'},
    {name: 'Estonia', iconClass: 'flag-icon-ee', code: '+372'},
    {name: 'Eswatini', iconClass: 'flag-icon-sz', code: '+268'},
    {name: 'Ethiopia', iconClass: 'flag-icon-et', code: '+251'},
    {name: 'Fiji', iconClass: 'flag-icon-fj', code: '+679'},
    {name: 'Finland', iconClass: 'flag-icon-fi', code: '+358'},
    {name: 'France', iconClass: 'flag-icon-fr', code: '+33'},
    {name: 'Gabon', iconClass: 'flag-icon-ga', code: '+241'},
    {name: 'Gambia', iconClass: 'flag-icon-gm', code: '+220'},
    {name: 'Georgia', iconClass: 'flag-icon-ge', code: '+995'},
    {name: 'Germany', iconClass: 'flag-icon-de', code: '+49'},
    {name: 'Ghana', iconClass: 'flag-icon-gh', code: '+233'},
    {name: 'Greece', iconClass: 'flag-icon-gr', code: '+30'},
    {name: 'Grenada', iconClass: 'flag-icon-gd', code: '+1'},
    {name: 'Guatemala', iconClass: 'flag-icon-gt', code: '+502'},
    {name: 'Guinea', iconClass: 'flag-icon-gn', code: '+224'},
    {name: 'Guinea-Bissau', iconClass: 'flag-icon-gw', code: '+245'},
    {name: 'Guyana', iconClass: 'flag-icon-gy', code: '+592'},
    {name: 'Haiti', iconClass: 'flag-icon-ht', code: '+509'},
    {name: 'Honduras', iconClass: 'flag-icon-hn', code: '+504'},
    {name: 'Hungary', iconClass: 'flag-icon-hu', code: '+36'},
    {name: 'Iceland', iconClass: 'flag-icon-is', code: '+354'},
    {name: 'India', iconClass: 'flag-icon-in', code: '+91'},
    {name: 'Indonesia', iconClass: 'flag-icon-id', code: '+62'},
    {name: 'Iran', iconClass: 'flag-icon-ir', code: '+98'},
    {name: 'Iraq', iconClass: 'flag-icon-iq', code: '+964'},
    {name: 'Ireland', iconClass: 'flag-icon-ie', code: '+353'},
    {name: 'Italy', iconClass: 'flag-icon-it', code: '+39'},
    {name: 'Jamaica', iconClass: 'flag-icon-jm', code: '+1'},
    {name: 'Japan', iconClass: 'flag-icon-jp', code: '+81'},
    {name: 'Jordan', iconClass: 'flag-icon-jo', code: '+962'},
    {name: 'Kazakhstan', iconClass: 'flag-icon-kz', code: '+7'},
    {name: 'Kenya', iconClass: 'flag-icon-ke', code: '+254'},
    {name: 'Kiribati', iconClass: 'flag-icon-ki', code: '+686'},
    {name: 'Korea, North', iconClass: 'flag-icon-kp', code: '+850'},
    {name: 'Korea, South', iconClass: 'flag-icon-kr', code: '+82'},
    {name: 'Kosovo', iconClass: 'flag-icon-xk', code: '+383'},
    {name: 'Kuwait', iconClass: 'flag-icon-kw', code: '+965'},
    {name: 'Kyrgyzstan', iconClass: 'flag-icon-kg', code: '+996'},
    {name: 'Laos', iconClass: 'flag-icon-la', code: '+856'},
    {name: 'Latvia', iconClass: 'flag-icon-lv', code: '+371'},
    {name: 'Lebanon', iconClass: 'flag-icon-lb', code: '+961'},
    {name: 'Lesotho', iconClass: 'flag-icon-ls', code: '+266'},
    {name: 'Liberia', iconClass: 'flag-icon-lr', code: '+231'},
    {name: 'Libya', iconClass: 'flag-icon-ly', code: '+218'},
    {name: 'Liechtenstein', iconClass: 'flag-icon-li', code: '+423'},
    {name: 'Lithuania', iconClass: 'flag-icon-lt', code: '+370'},
    {name: 'Luxembourg', iconClass: 'flag-icon-lu', code: '+352'},
    {name: 'Madagascar', iconClass: 'flag-icon-mg', code: '+261'},
    {name: 'Malawi', iconClass: 'flag-icon-mw', code: '+265'},
    {name: 'Malaysia', iconClass: 'flag-icon-my', code: '+60'},
    {name: 'Maldives', iconClass: 'flag-icon-mv', code: '+960'},
    {name: 'Mali', iconClass: 'flag-icon-ml', code: '+223'},
    {name: 'Malta', iconClass: 'flag-icon-mt', code: '+356'},
    {name: 'Marshall Islands', iconClass: 'flag-icon-mh', code: '+692'},
    {name: 'Mauritania', iconClass: 'flag-icon-mr', code: '+222'},
    {name: 'Mauritius', iconClass: 'flag-icon-mu', code: '+230'},
    {name: 'Mexico', iconClass: 'flag-icon-mx', code: '+52'},
    {name: 'Micronesia', iconClass: 'flag-icon-fm', code: '+691'},
    {name: 'Moldova', iconClass: 'flag-icon-md', code: '+373'},
    {name: 'Monaco', iconClass: 'flag-icon-mc', code: '+377'},
    {name: 'Mongolia', iconClass: 'flag-icon-mn', code: '+976'},
    {name: 'Montenegro', iconClass: 'flag-icon-me', code: '+382'},
    {name: 'Morocco', iconClass: 'flag-icon-ma', code: '+212'},
    {name: 'Mozambique', iconClass: 'flag-icon-mz', code: '+258'},
    {name: 'Myanmar', iconClass: 'flag-icon-mm', code: '+95'},
    {name: 'Namibia', iconClass: 'flag-icon-na', code: '+264'},
    {name: 'Nauru', iconClass: 'flag-icon-nr', code: '+674'},
    {name: 'Nepal', iconClass: 'flag-icon-np', code: '+977'},
    {name: 'Netherlands', iconClass: 'flag-icon-nl', code: '+31'},
    {name: 'New Zealand', iconClass: 'flag-icon-nz', code: '+64'},
    {name: 'Nicaragua', iconClass: 'flag-icon-ni', code: '+505'},
    {name: 'Niger', iconClass: 'flag-icon-ne', code: '+227'},
    {name: 'Nigeria', iconClass: 'flag-icon-ng', code: '+234'},
    {name: 'North Macedonia', iconClass: 'flag-icon-mk', code: '+389'},
    {name: 'Norway', iconClass: 'flag-icon-no', code: '+47'},
    {name: 'Oman', iconClass: 'flag-icon-om', code: '+968'},
    {name: 'Pakistan', iconClass: 'flag-icon-pk', code: '+92'},
    {name: 'Palau', iconClass: 'flag-icon-pw', code: '+680'},
    {name: 'Palestine', iconClass: 'flag-icon-ps', code: '+970'},
    {name: 'Panama', iconClass: 'flag-icon-pa', code: '+507'},
    {name: 'Papua New Guinea', iconClass: 'flag-icon-pg', code: '+675'},
    {name: 'Paraguay', iconClass: 'flag-icon-py', code: '+595'},
    {name: 'Peru', iconClass: 'flag-icon-pe', code: '+51'},
    {name: 'Philippines', iconClass: 'flag-icon-ph', code: '+63'},
    {name: 'Poland', iconClass: 'flag-icon-pl', code: '+48'},
    {name: 'Portugal', iconClass: 'flag-icon-pt', code: '+351'},
    {name: 'Qatar', iconClass: 'flag-icon-qa', code: '+974'},
    {name: 'Romania', iconClass: 'flag-icon-ro', code: '+40'},
    {name: 'Russia', iconClass: 'flag-icon-ru', code: '+7'},
    {name: 'Rwanda', iconClass: 'flag-icon-rw', code: '+250'},
    {name: 'Samoa', iconClass: 'flag-icon-ws', code: '+685'},
    {name: 'San Marino', iconClass: 'flag-icon-sm', code: '+378'},
    {name: 'Sao Tome and Principe', iconClass: 'flag-icon-st', code: '+239'},
    {name: 'Saudi Arabia', iconClass: 'flag-icon-sa', code: '+966'},
    {name: 'Senegal', iconClass: 'flag-icon-sn', code: '+221'},
    {name: 'Serbia', iconClass: 'flag-icon-rs', code: '+381'},
    {name: 'Seychelles', iconClass: 'flag-icon-sc', code: '+248'},
    {name: 'Sierra Leone', iconClass: 'flag-icon-sl', code: '+232'},
    {name: 'Singapore', iconClass: 'flag-icon-sg', code: '+65'},
    {name: 'Slovakia', iconClass: 'flag-icon-sk', code: '+421'},
    {name: 'Slovenia', iconClass: 'flag-icon-si', code: '+386'},
    {name: 'Solomon Islands', iconClass: 'flag-icon-sb', code: '+677'},
    {name: 'Somalia', iconClass: 'flag-icon-so', code: '+252'},
    {name: 'South Africa', iconClass: 'flag-icon-za', code: '+27'},
    {name: 'South Korea', iconClass: 'flag-icon-kr', code: '+82'},
    {name: 'South Sudan', iconClass: 'flag-icon-ss', code: '+211'},
    {name: 'Spain', iconClass: 'flag-icon-es', code: '+34'},
    {name: 'Sri Lanka', iconClass: 'flag-icon-lk', code: '+94'},
    {name: 'Sudan', iconClass: 'flag-icon-sd', code: '+249'},
    {name: 'Suriname', iconClass: 'flag-icon-sr', code: '+597'},
    {name: 'Swaziland', iconClass: 'flag-icon-sz', code: '+268'},
    {name: 'Sweden', iconClass: 'flag-icon-se', code: '+46'},
    {name: 'Switzerland', iconClass: 'flag-icon-ch', code: '+41'},
    {name: 'Syria', iconClass: 'flag-icon-sy', code: '+963'},
    {name: 'Taiwan', iconClass: 'flag-icon-tw', code: '+886'},
    {name: 'Tajikistan', iconClass: 'flag-icon-tj', code: '+992'},
    {name: 'Tanzania', iconClass: 'flag-icon-tz', code: '+255'},
    {name: 'Thailand', iconClass: 'flag-icon-th', code: '+66'},
    {name: 'Timor-Leste', iconClass: 'flag-icon-tl', code: '+670'},
    {name: 'Togo', iconClass: 'flag-icon-tg', code: '+228'},
    {name: 'Tonga', iconClass: 'flag-icon-to', code: '+676'},
    {name: 'Tunisia', iconClass: 'flag-icon-tn', code: '+216'},
    {name: 'Turkey', iconClass: 'flag-icon-tr', code: '+90'},
    {name: 'Turkmenistan', iconClass: 'flag-icon-tm', code: '+993'},
    {name: 'Tuvalu', iconClass: 'flag-icon-tv', code: '+688'},
    {name: 'Uganda', iconClass: 'flag-icon-ug', code: '+256'},
    {name: 'Ukraine', iconClass: 'flag-icon-ua', code: '+380'},
    {name: 'United Arab Emirates', iconClass: 'flag-icon-ae', code: '+971'},
    {name: 'United Kingdom', iconClass: 'flag-icon-gb', code: '+44'},
    {name: 'United States', iconClass: 'flag-icon-us', code: '+1'},
    {name: 'Uruguay', iconClass: 'flag-icon-uy', code: '+598'},
    {name: 'Uzbekistan', iconClass: 'flag-icon-uz', code: '+998'},
    {name: 'Vanuatu', iconClass: 'flag-icon-vu', code: '+678'},
    {name: 'Vatican City', iconClass: 'flag-icon-va', code: '+379'},
    {name: 'Venezuela', iconClass: 'flag-icon-ve', code: '+58'},
    {name: 'Vietnam', iconClass: 'flag-icon-vn', code: '+84'},
    {name: 'Yemen', iconClass: 'flag-icon-ye', code: '+967'},
    {name: 'Zambia', iconClass: 'flag-icon-zm', code: '+260'},
    {name: 'Zimbabwe', iconClass: 'flag-icon-zw', code: '+263'},
  ];
  selectedCountry = {
    name: 'Tunisia',
    iconClass: 'flag-icon-tn',
    code: '+216',
  };
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private projectOwnerService: ProjectOwnerService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      // Project Owner fields
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern("^[a-zA-ZÀ-ÿ\\s\\-']+$"),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern("^[a-zA-ZÀ-ÿ\\s\\-']+$"),
        ],
      ],
      company: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      companyIdentifier: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^[a-z0-9-]+$'),
        ],
      ],
      function: ['', [Validators.maxLength(100)]],
      website: [
        '',
        [
          Validators.maxLength(200),
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      phone: [
        '',
        [
          Validators.maxLength(20),
          Validators.pattern('^[0-9\\s\\+\\-\\(\\)]+$'),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],

      // Project fields
      projectName: ['', [Validators.required, Validators.maxLength(100)]],
      projectCountry: ['', Validators.required],
      region: ['', Validators.maxLength(100)],
      projectNature: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(2000),
        ],
      ],
      estimation: ['No'],
      estimationValue: [''],
      certified: ['No'],
      // Removed pdf input field
      availableStock: [0, [Validators.required, Validators.min(1)]],
      cost: [0, [Validators.required, Validators.min(1)]],
      minimumPurchase: [0, [Validators.required, Validators.min(1)]],
      mechanism: ['', Validators.required],
      objectiveImage1: ['', Validators.required],
      objectiveImage2: ['', Validators.required],
      objectiveImage3: ['', Validators.required],
      objectiveImage4: ['', Validators.required],
    });

    // Add conditional validation for estimationValue
    this.projectForm.get('estimation')?.valueChanges.subscribe((value) => {
      const estimationValueControl = this.projectForm.get('estimationValue');
      if (value === 'Yes') {
        estimationValueControl?.setValidators([
          Validators.required,
          Validators.min(0.01),
          Validators.max(100000000),
        ]);
      } else {
        estimationValueControl?.clearValidators();
      }
      estimationValueControl?.updateValueAndValidity();
    });

    // Initialize filtered countries
    this.filteredCountries = [...this.countries];
  }

  ngOnInit() {
    // Add animation classes when component loads
    document.addEventListener('DOMContentLoaded', () => {
      this.animateElements();
    });
  }

  // Add staggered animation to form elements
  animateElements() {
    const formElements = document.querySelectorAll(
      '.form-floating, .radio-group, .file-upload, .image-selection'
    );
    formElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate__animated', 'animate__fadeInUp');
      }, 100 * index);
    });
  }

  // Filter countries based on search input
  filterCountries(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredCountries = this.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchValue) ||
        country.code.toLowerCase().includes(searchValue)
    );
  }

  // Enhanced image upload handler
  onImageUpload(event: any, imageType: 'banner' | 'map' | 'url'): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        this.submitError = `${
          imageType === 'banner' ? 'Banner' : imageType === 'map' ? 'Map' : 'URL'
        } file must be an image`;
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.submitError = `${
          imageType === 'banner' ? 'Banner' : imageType === 'map' ? 'Map' : 'URL'
        } image size must be less than 5MB`;
        return;
      }

      // Store the file and create a preview
      if (imageType === 'banner') {
        this.bannerImage = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.bannerImagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (imageType === 'map') {
        this.mapImage = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.mapImagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (imageType === 'url') {
        this.urlImage = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.urlImagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }

      // Clear any previous errors
      this.submitError = null;
    }
  }

  selectCountry(selectedCountry: any) {
    this.selectedCountry = selectedCountry;
  }

  selectObjectiveImage(imageUrl: string, controlIndex: number) {
    const controlName = `objectiveImage${controlIndex}`;
    
    // If already selected, deselect it
    if (this.selectedObjectiveImages.includes(imageUrl)) {
      // Remove from selected list
      this.selectedObjectiveImages = this.selectedObjectiveImages.filter(img => img !== imageUrl);
      
      // Clear the form control value
      this.projectForm.patchValue({
        [controlName]: ''
      });
    } else {
      // Check if already 4 objectives are selected
      if (this.selectedObjectiveImages.length >= 4) {
        // Show error message
        this.submitError = 'You can only select 4 sustainable development objectives';
        return;
      }
      
      // Find next available objectiveImage slot (1-4)
      let availableSlot = 0;
      for (let i = 1; i <= 4; i++) {
        const slotName = `objectiveImage${i}`;
        if (!this.projectForm.get(slotName)?.value) {
          availableSlot = i;
          break;
        }
      }
      
      if (availableSlot === 0) {
        // This should not happen as we check length above, but just in case
        return;
      }
      
      // Add to selected list
      this.selectedObjectiveImages.push(imageUrl);
      
      // Update the form control
      this.projectForm.patchValue({
        [`objectiveImage${availableSlot}`]: imageUrl
      });
    }
    
    // Clear any error message when selection changes
    if (this.submitError && this.submitError.includes('objectives')) {
      this.submitError = null;
    }
  }

  isObjectiveImageSelected(imageUrl: string): boolean {
    return this.selectedObjectiveImages.includes(imageUrl);
  }

  onSubmit() {
    this.isSubmitted = true;
    // Validate the form
    if (this.projectForm?.valid && this.bannerImage && this.mapImage) {
      this.isSubmitting = true;

      // Prepare project owner data
      const projectOwnerData = {
        firstname: this.projectForm.value.firstName,
        nom: this.projectForm.value.name,
        company: this.projectForm.value.company,
        job_function: this.projectForm.value.function,
        website: this.projectForm.value.website,
        phone: this.selectedCountry.code + this.projectForm.value.phone,
        email: this.projectForm.value.email,
        region: this.projectForm.value.region,
        description: this.projectForm.value.description,
        estimation: this.projectForm.value.estimation === 'Yes',
        estimationValue: this.projectForm.value.estimationValue || 0,
        certified: this.projectForm.value.certified === 'Yes',
        companyIdentifier: this.projectForm.value.companyIdentifier,
        password: 'defaultPassword123', // We'll need to implement proper password handling
      };

      // Prepare project data
      const projectData = {
        name: this.projectForm.value.projectName,
        country: this.projectForm.value.projectCountry,
        category: this.projectForm.value.projectNature,
        description: this.projectForm.value.description,
        certified: this.projectForm.value.certified === 'Yes',
        estimation: this.projectForm.value.estimation === 'Yes',
        estimationValue: this.projectForm.value.estimationValue || 0,
        availableStock: this.projectForm.value.availableStock,
        cost: this.projectForm.value.cost,
        minimumPurchase: this.projectForm.value.minimumPurchase,
        mechanism: this.projectForm.value.mechanism,
        typeOfProject: this.projectForm.value.projectNature,
        imageUrl1: this.projectForm.value.objectiveImage1,
        imageUrl2: this.projectForm.value.objectiveImage2,
        imageUrl3: this.projectForm.value.objectiveImage3,
        imageUrl4: this.projectForm.value.objectiveImage4,
        flag: `/assets/img/${this.projectForm.value.projectCountry.toLowerCase()}Flag.png`,
      };
      console.log(projectData, projectOwnerData)
      // Create FormData for file uploads
      const formData = new FormData();

      // Add the banner image
      if (this.bannerImage) {
        formData.append('bannerImage', this.bannerImage);
      }

      // Add the map image
      if (this.mapImage) {
        formData.append('mapImage', this.mapImage);
      }

      // Add the URL image
      if (this.urlImage) {
        formData.append('urlImage', this.urlImage);
      }

      // Submit to backend with delay to show loading state
      setTimeout(() => {
        this.projectOwnerService
          .createProjectOwnerWithProject(
            projectOwnerData,
            projectData,
            formData
          )
          .subscribe(
            (response) => {
              console.log('Project and owner created successfully:', response);
              this.submitSuccess = true;
              this.submitError = null;
              this.isSubmitting = false;

              // Show success message with scroll to top
              window.scrollTo({top: 0, behavior: 'smooth'});

              // Redirect after delay
              setTimeout(() => {
                this.router.navigate(['/' + RoutesEnum.MARKETPLACE]);
              }, 3000);
            },
            (error) => {
              console.error('Error creating project and owner:', error);
              this.submitSuccess = false;
              this.submitError =
                'Failed to create project and owner. Please try again.';
              this.isSubmitting = false;
              // Scroll to top to show error
              window.scrollTo({top: 0, behavior: 'smooth'});
            }
          );
      }, 800); // Simulated delay for loading indicator
    } else {
      // Form is invalid
      // Highlight invalid fields with animation
      this.highlightInvalidFields();

      if (!this.bannerImage) {
        this.submitError = 'Please upload a banner image';
      } else if (!this.mapImage) {
        this.submitError = 'Please upload a map image';
      }
    }
  }

  // Highlight invalid fields with animation
  highlightInvalidFields() {
    const invalidElements = document.querySelectorAll('.ng-invalid.ng-touched');
    invalidElements.forEach((el) => {
      (el as HTMLElement).classList.add('shake-animation');
      setTimeout(() => {
        (el as HTMLElement).classList.remove('shake-animation');
      }, 820);
    });

    // Scroll to the first invalid element
    if (invalidElements.length > 0) {
      const firstInvalid = invalidElements[0];
      firstInvalid.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
