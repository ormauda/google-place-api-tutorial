import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCFMVspe4imyzVC649S6RfUPdTTbjGRTWM",
            libraries: ["places", "geometry"]
        }),
        BrowserModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
