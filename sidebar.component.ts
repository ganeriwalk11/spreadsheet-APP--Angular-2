import {Component,OnInit} from 'angular2/core';
import {ProfileService} from './profile.service';
import {WeatherService} from './weather-service';
import {Profile} from './profile';
import {WeatherItem} from './weather';

@Component({
    selector: 'my-sidebar',
    template: `
            <h3>Saved profiles</h3>
            <button (click)="onSaveNew()">Save List To Profiles</button>
            <article class="profile" *ngFor="#profile of profiles" (click)="onLoadProfile(profile)">
                <h3>{{profile.profileName}}</h3>
                <p>{{profile.cities.join(', ')}}</p>
                <span class="delete" (click)="onDeleteProfile($event,profile)">X</span>
            </article>
    `,
    providers: [ProfileService],
    styleUrls: ['app/style/sidebar-style.css']
})
export class SidebarComponent implements OnInit{
    profiles:Profile[];

    constructor(private _profileservice: ProfileService,private _weatherservice: WeatherService ){}

    onSaveNew(){
        const cities = this._weatherservice.getWeatherItems().map(function(element){
            return element.cityName;
        });
        this._profileservice.saveNewProfile(cities);
    }

    onLoadProfile(profile:Profile){
        var me = this;
        this._weatherservice.clearWeatherItems();
        for(let i=0;i<profile.cities.length;i++){
            me._weatherservice.searchWeatherData(profile.cities[i])
                .retry()
                .subscribe(function(data){
                    const weatherItem = new WeatherItem(data.name,data.weather[0].description,data.main.temp);
                    me._weatherservice.addWeatherItem(weatherItem);
                })
        }
    }

    onDeleteProfile(profile:Profile){
        this._profileservice.deleteProfile(profile);
    }

    ngOnInit(){
        this.profiles = this._profileservice.getProfiles();
    }
}