import {Component,OnInit} from 'angular2/core';
import {WeatherItemComponent} from './weather-item.component';
import {WEATHER_ITEMS} from './weather.data';
import {WeatherItem} from './weather';
import {WeatherService} from './weather-service'; 

@Component({
    selector: 'weather-list',
    template: `
        <section>
        <div class="weatherlist">
            <weather-item *ngFor="#weatheritem of weatheritems" [weatheritem]="weatheritem"></weather-item>
        </div>
        </section>
    `,
    directives: [WeatherItemComponent]
})


export class WeatherListComponent implements OnInit{
    
    weatheritems: WeatherItem[];
    
    constructor(private _weatherservice: WeatherService){

    }
    ngOnInit(): any{
        this.weatheritems = this._weatherservice.getWeatherItems();
    }
}

