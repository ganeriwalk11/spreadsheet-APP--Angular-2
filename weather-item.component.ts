import {Component} from 'angular2/core';
import {WeatherItem} from './weather';
@Component({
    selector: 'weather-item',
    template: `
        <article>
            <div class="col1">
                <h3>{{weatheritem.cityName}}</h3>
                <p class="info">{{weatheritem.description}}</p>
            </div>
            <div class="col2">
                <span class="temperature">{{weatheritem.temperature}}</span>
            </div>
            
        </article>
    `,
    styleUrls: ['app/style/weather-item.css'],
    inputs: ['weatheritem']
})


export class WeatherItemComponent{
    weatheritem:WeatherItem;
    
   
}

