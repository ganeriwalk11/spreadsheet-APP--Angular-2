import {Component,OnInit} from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import {WeatherService} from './weather-service';
import {WeatherItem} from './weather';
import {Subject} from 'rxjs/Subject';
import {WEATHER_ITEMS} from './weather.data';
import 'rxjs/Rx';

@Component({
    selector: 'my-weather-search',
    template: `
        <section class="weather-search">
            <form #f="ngForm" (ngSubmit)="onSubmit(f)" >
                <label for="city">City</label>
                <input type="text" ngControl="location" id="city" (keyup)="onSearchLocation(input.value)" placeholder="Enter City Name" required #input>
                <button type="submit">Add City</button>
            </form>
            <div>
            <span class="info">City Found:{{data.name | async}}</span>
            </div>
             <div>
                <button (click)="clearTheList()">Clear:</button>
            </div>
        </section>
    `,
})

export class WeatherSearchComponent implements OnInit {

    private searchStream = new Subject<string>();
    data:any= {};   
    constructor(private _weatherservice:WeatherService){

    }
    onSubmit(form: ControlGroup){
        var me = this;
        me._weatherservice.searchWeatherData(form.value.location)
        .subscribe(
            function(data){
            const weatherItem = new WeatherItem(data.name,data.weather[0].description,data.main.temp);
            me._weatherservice.addWeatherItem(weatherItem);
            },function(err){
                console.log(err);
            },
            function(){
                console.log("Completed");
            });
    }

    onSearchLocation(cityName:string){
        console.log(this);
        this.searchStream
            .next(cityName);
    }

    clearTheList(){
        this._weatherservice.clearWeatherItems();
    }

    ngOnInit() {
        console.log(this);
         this.searchStream
         .debounceTime(500)
         .distinctUntilChanged()
         .switchMap((da:string)=>
             this._weatherservice.searchWeatherData(da)
         )
         .subscribe(function(data){this.data = data;console.log(this.data.name)});
            
    }

}