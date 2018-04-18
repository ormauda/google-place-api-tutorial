import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { BranchesCalculatorService, SimpleBranchesCalculatorService } from './branches-calculator/branches-calculator.service';
import { IBranch } from './models/IBranch';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [
        { provide: BranchesCalculatorService, useClass: SimpleBranchesCalculatorService }
    ]
})
export class AppComponent implements OnInit {
    title = 'app';
    public latitude: number;
    public longitude: number;
    public branchesDistances: Array<IBranch>

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private branchesCalculatorService: BranchesCalculatorService) { }


    ngOnInit() {
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.branchesCalculatorService.init();
        this.branchesDistances = [];

        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                });
            });
        });
    }

    public calculateDistances(): void {
        this.branchesDistances = 
            this.branchesCalculatorService.getBranchesDistanceFrom(this.latitude, this.longitude);

    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }
}
