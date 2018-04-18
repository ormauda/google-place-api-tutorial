import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCFMVspe4imyzVC649S6RfUPdTTbjGRTWM",
            libraries: ["places"]
        }),
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
