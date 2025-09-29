import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LocationService } from './service/location.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LocationService]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  cartCount = 3;
  showContactModal = false;
  showLocationModal = false;
  location : GeolocationPosition | null = null;
  errorMessage : string | null = null;
  isLoading = false;
  confirmedLocation : string = '';
  
  constructor(private locationService: LocationService) {}

  // Method to be called by a button click
  public requestLocation(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.locationService.getUserLocation().subscribe({
      // Handle the successful location retrieval
      next: (position) => {
        this.location = position;
        this.errorMessage = null;
        this.isLoading = false;
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        console.log('Accuracy:', position.coords.accuracy, 'meters');
      },
      // Handle errors
      error: (error) => {
        this.location = null;
        this.isLoading = false;
        
        switch (error.code) {
          case 1:
            this.errorMessage = "Permission denied. Please enable location access in your browser settings and try again.";
            break;
          case 2:
            this.errorMessage = "Location unavailable. Please check your internet connection and try again.";
            break;
          case 3:
            this.errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            this.errorMessage = "Could not get location. Please ensure location services are enabled and try again.";
        }
        console.error('Error getting location:', error);
      }
    });
  }

  // Get display text for location in header
  getLocationDisplayText(): string {
    if (this.confirmedLocation) {
      return this.confirmedLocation;
    }
    if (this.location) {
      return `Location Set (${this.location.coords.latitude.toFixed(2)}, ${this.location.coords.longitude.toFixed(2)})`;
    }
    return 'Select your location';
  }

  // Confirm the current location
  confirmLocation(): void {
    if (this.location) {
      this.confirmedLocation = `Current Location (${this.location.coords.latitude.toFixed(4)}, ${this.location.coords.longitude.toFixed(4)})`;
      this.showLocationModal = false;
      console.log('Location confirmed:', this.confirmedLocation);
    }
  }
  
  categories = [
    { name: 'Vegetables & Fruits', image: 'https://i.postimg.cc/44MFKS61/besan-packaging-pouch.jpg', deliveryTime: '8 mins' },
    { name: 'Dairy & Bakery', image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '10 mins' },
    { name: 'Medicines', image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '15 mins' },
    { name: 'Meat & Fish', image: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '12 mins' },
    { name: 'Pet Care', image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '20 mins' },
    { name: 'Electronics', image: 'https://images.pexels.com/photos/163117/phone-old-year-built-1955-163117.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '25 mins' },
    { name: 'Home & Kitchen', image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '18 mins' },
    { name: 'Beauty & Personal Care', image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '15 mins' },
    { name: 'BESAN', image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=200', deliveryTime: '15 mins' }
  ];

  featuredProducts = [
    {
      id: 1,
      name: 'Fresh Bananas',
      description: 'Organic, fresh and sweet',
      price: 40,
      originalPrice: 50,
      discount: 20,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '8 mins',
      badge: 'Fresh',
      inStock: true
    },
    {
      id: 2,
      name: 'Amul Fresh Milk',
      description: '500ml, Full cream',
      price: 30,
      originalPrice: 35,
      discount: 14,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '10 mins',
      badge: 'Popular',
      inStock: true
    },
    {
      id: 3,
      name: 'Brown Bread',
      description: 'Whole wheat, healthy',
      price: 25,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '10 mins',
      inStock: true
    },
    {
      id: 4,
      name: 'Paracetamol',
      description: '10 tablets, 500mg',
      price: 15,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '15 mins',
      badge: 'Medicine',
      inStock: true
    },
    {
      id: 5,
      name: 'iPhone Charger',
      description: 'Lightning cable, 1m',
      price: 299,
      originalPrice: 399,
      discount: 25,
      image: 'https://images.pexels.com/photos/163117/phone-old-year-built-1955-163117.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '25 mins',
      inStock: true
    },
    {
      id: 6,
      name: 'Maggi Noodles',
      description: '2-minute noodles, pack of 4',
      price: 48,
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=300',
      deliveryTime: '8 mins',
      badge: 'Instant',
      inStock: true
    }
  ];

  fmcgItems = [
    {
      id: 7,
      name: 'Colgate Toothpaste',
      brand: 'Colgate',
      price: 85,
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true
    },
    {
      id: 8,
      name: 'Surf Excel Detergent',
      brand: 'Hindustan Unilever',
      price: 145,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true
    },
    {
      id: 9,
      name: 'Tata Salt',
      brand: 'Tata Consumer',
      price: 22,
      image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: false
    },
    {
      id: 10,
      name: 'Dove Soap',
      brand: 'Unilever',
      price: 65,
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true
    }
  ];

  selectCategory(category: any) {
    console.log('Selected category:', category);
    // In a real app, this would filter products by category
  }

  addToCart(product: any) {
    this.cartCount++;
    console.log('Added to cart:', product);
    // Show success message or animation
  }

  quickOrder(product: any) {
    console.log('Quick order for:', product);
    this.showContactModal = true;
  }

  submitQuickOrder() {
    console.log('Quick order submitted');
    alert('Your order has been received! We will call you shortly.');
    this.showContactModal = false;
  }
}

bootstrapApplication(AppComponent);