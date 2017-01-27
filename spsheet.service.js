System.register(['angular2/core', 'rxjs/Observable', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, http_1;
    var SpsheetService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            SpsheetService = (function () {
                function SpsheetService(_http) {
                    this._http = _http;
                }
                SpsheetService.prototype.fetchData = function () {
                    return this._http.get('app/jsondata/hcdata.json')
                        .map(function (res) { return res.json(); });
                };
                SpsheetService.prototype.postData = function (pdata) {
                    var bodyString = JSON.stringify(pdata);
                    console.log(bodyString);
                    //console.log(JSON.parse(bodyString));
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post('http://localhost:3000/hcdata.json', bodyString, options)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
                };
                SpsheetService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SpsheetService);
                return SpsheetService;
            }());
            exports_1("SpsheetService", SpsheetService);
        }
    }
});
//# sourceMappingURL=spsheet.service.js.map