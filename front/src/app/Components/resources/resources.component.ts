import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent {
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    const imageContainer = img.closest('.resource-image');

    img.classList.add('loaded');
    if (imageContainer) {
      imageContainer.classList.add('loaded');
    }

    // Add a slight delay for smoother transition
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 100);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    const imageContainer = img.closest('.resource-image');

    // Set a fallback image or placeholder
    img.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwVjIwME0xNTAgMTUwSDI1MCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';

    if (imageContainer) {
      imageContainer.classList.add('loaded', 'error');
    }
  }
}
