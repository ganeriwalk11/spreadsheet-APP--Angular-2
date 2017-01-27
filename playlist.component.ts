import {Component} from 'angular2/core';
import {Config} from './config.service';
import {AppComponent} from './app.component';
import {video} from './video';

@Component({
    selector: 'playlist',
    template: '<h2>{{pl}}</h2><table><tr *ngFor="#v of videos" (click) = "onselect(v)"><td>{{v.id}}</td></tr></table>',
    inputs: ['videos']
})


export class PlaylistComponent{
    pl = "Hey there, playlist!";
    onselect(v){
        return console.log(JSON.stringify(v));
    }
}

