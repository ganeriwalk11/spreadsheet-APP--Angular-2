import {Injectable} from 'angular2/core';
import {WEATHER_ITEMS} from'./weather.data';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import {WeatherItem} from './weather';
import 'rxjs/Rx';

@Injectable()
export class WeatherService{
    constructor(private _http:Http){

    }

    getWeatherItems(){
        return WEATHER_ITEMS;
    }

    clearWeatherItems(){
        WEATHER_ITEMS.splice(0);
    }

    searchWeatherData(cityName:string): Observable<any>{
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName + '&APPID=96b35e7745f5a6ee3319b3af3aa567bc&units=metric')
        .map(function(data){
            return data.json();
        }).catch(function(err){
            console.error(err);
            return Observable.throw(err.json())
        });
    }
    addWeatherItem(weatherItem:WeatherItem){
        console.log(weatherItem);
        WEATHER_ITEMS.push(weatherItem);
    }
}