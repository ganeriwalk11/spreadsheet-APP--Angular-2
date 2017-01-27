System.register(['angular2/core', 'rxjs/Observable', 'angular2/http', './spsheet.service', 'rxjs/Subject', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Observable_1, http_1, spsheet_service_1, Subject_1;
    var SpsheetComponent;
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
            function (spsheet_service_1_1) {
                spsheet_service_1 = spsheet_service_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (_1) {}],
        execute: function() {
            SpsheetComponent = (function () {
                function SpsheetComponent(_http, _spservice) {
                    this._http = _http;
                    this._spservice = _spservice;
                    this.showMe = false;
                    this.undo = [];
                    this.redo = [];
                    this.tempData = [];
                    this.searchStream = new Subject_1.Subject();
                }
                SpsheetComponent.prototype.storeData = function ($event) {
                    var me = this;
                    var a = $event.target.innerText.toString();
                    var focusStream$ = Observable_1.Observable.of(a);
                    focusStream$.subscribe(function (data) {
                        me.tempData.push(data);
                    }, function (err) {
                        console.log(err);
                    }, function () {
                        console.log("Focus eveent");
                    });
                };
                SpsheetComponent.prototype.reloadData = function () {
                    var me = this;
                    me._spservice.fetchData()
                        .subscribe(function (data) {
                        me.data = [];
                        me.categorybox = [];
                        me.undo = [];
                        me.redo = [];
                        me.data = data;
                        me.dataCopy = data;
                        me.heads = Object.keys(me.data[0]);
                        var stream3$ = Observable_1.Observable.of(me.data, me.heads)
                            .map(function (data) {
                            for (var j = 0; j < me.data.length; j++) {
                                for (var i = 0; i < me.heads.length; i++) {
                                    if (me.heads[i] === "category" && me.categorybox.indexOf(me.data[j][me.heads[i]]) === -1) {
                                        me.categorybox.push(me.data[j][me.heads[i]]);
                                    }
                                }
                            }
                        })
                            .subscribe(function (data) {
                        }, function (err) {
                            console.log(err);
                        }, function () {
                            console.log("Completed dropdown");
                        });
                    }, function (err) { return console.log(err); }, function () { return console.log('Completed'); });
                };
                SpsheetComponent.prototype.checkHead = function ($event, headid, i, j) {
                    var me = this;
                    me.count = $event.target.innerText;
                    var header = headid;
                    var t = me.tempData[me.tempData.length - 1];
                    var x = me.count;
                    var stream2$ = Observable_1.Observable.of(me.count);
                    stream2$.subscribe(function (count) {
                        console.log(me.dataCopy[i][me.heads[j]]);
                        console.log(me.count);
                        if (me.count != (me.dataCopy[i][me.heads[j]])) {
                            $event.target.style.color = '#148F77';
                            $event.target.style.border = '3px solid #148F77';
                        }
                    });
                    if (me.tempData[me.tempData.length - 1] != me.count) {
                        me.undo.push({ i: i, j: j, t: t, x: x });
                    }
                    me.tempData.pop();
                    if (header === "id") {
                        var stream$ = Observable_1.Observable.of(me.count);
                        stream$.subscribe(function (value) {
                            if (value != parseInt(value, 10)) {
                                $event.target.style.color = 'red';
                                $event.target.style.border = '3px solid red';
                            }
                            else if (me.count != me.dataCopy[i][me.heads[j]]) {
                                $event.target.style.color = '#148F77';
                                $event.target.style.border = '3px solid #148F77';
                            }
                        });
                    }
                    else if (header === 'name' && (me.count != me.dataCopy[i][me.heads[j]])) {
                        var uniqueName$ = Observable_1.Observable.of(me.count.toString());
                        uniqueName$.map(function (value) {
                            var a = value;
                            for (var j = 0; j < me.data.length; j++) {
                                if (me.data[j][header] == a) {
                                    $event.target.style.color = 'red';
                                    $event.target.style.border = '3px solid red';
                                }
                            }
                        }).subscribe();
                    }
                    if (me.count == (me.dataCopy[i][me.heads[j]])) {
                        $event.target.style.color = 'black';
                        $event.target.style.border = '0px solid #148F77';
                    }
                };
                SpsheetComponent.prototype.filterData = function (t) {
                    var me2 = this;
                    me2._spservice.fetchData()
                        .subscribe(function (data) {
                        me2.data = [];
                        me2.categorybox = [];
                        me2.heads = Object.keys(data[0]);
                        var stream3$ = Observable_1.Observable.of(data, me2.heads)
                            .map(function (data) {
                            var k = 0;
                            for (var j = 0; j < data.length; j++) {
                                for (var i = 0; i < me2.heads.length; i++) {
                                    if (me2.heads[i] === "category" && data[j][me2.heads[i]] === t) {
                                        me2.data[k++] = data[j];
                                    }
                                    if (me2.heads[i] === "category" && me2.categorybox.indexOf(data[j][me2.heads[i]]) === -1) {
                                        me2.categorybox.push(data[j][me2.heads[i]]);
                                    }
                                }
                            }
                        })
                            .subscribe(function (data) {
                        }, function (err) {
                            console.log(err);
                        }, function () {
                            console.log("Completed dropdown");
                        });
                    }, function (err) { return console.log(err); }, function () { return console.log('Completed'); });
                };
                SpsheetComponent.prototype.undoData = function () {
                    var me = this;
                    if (me.undo.length === 0) {
                        alert("No changes made");
                    }
                    else {
                        var len = me.undo.length - 1;
                        var r = (me.undo[len]["i"]);
                        var c = (me.undo[len]["j"]);
                        var value = (me.undo[len]["t"]);
                        var x = me.undo[len]["x"];
                        var myTable = document.getElementsByTagName('tr')[r + 1];
                        myTable.children[c].innerHTML = value;
                        me.data[r][me.heads[c]] = value;
                        me.redo.push(me.undo.pop());
                        console.log(myTable.children[c].innerHTML);
                        console.log(me.undo);
                        console.log(me.redo);
                    }
                };
                SpsheetComponent.prototype.redoData = function () {
                    var me = this;
                    if (me.redo.length === 0) {
                        alert("Nothing undone");
                    }
                    else {
                        var len = me.redo.length - 1;
                        var r = (me.redo[len]["i"]);
                        var c = (me.redo[len]["j"]);
                        var value = (me.redo[len]["x"]);
                        var x = me.redo[len]["value"];
                        var myTable = document.getElementsByTagName('tr')[r + 1];
                        myTable.children[c].innerHTML = value;
                        me.data[r][me.heads[c]] = value;
                        console.log(myTable.children[c].innerHTML);
                        me.undo.push(me.redo.pop());
                        console.log(me.undo);
                        console.log(me.redo);
                    }
                };
                SpsheetComponent.prototype.saveData = function () {
                    var me = this;
                    var abc = me._spservice.postData(me.dataCopy);
                    abc.subscribe(function (comments) {
                        console.log(comments);
                    }, function (err) {
                        // Log errors if any
                        console.log(err);
                    });
                };
                SpsheetComponent.prototype.addNewEntry = function () {
                    var newtr = document.createElement("tr");
                    var x = document.getElementById("myTable").children[1];
                    var y = x.children[1];
                    //x.appendChild(newRow);
                    console.log(y);
                    var addRow$ = Observable_1.Observable.create();
                    addRow$.map(function (e) {
                    });
                };
                SpsheetComponent = __decorate([
                    core_1.Component({
                        selector: 'my-spsheet',
                        template: "\n             <button id=\"fetch\" (click)=\"reloadData()\">Reload Data</button>\n             <button *ngIf=\"categorybox\" id=\"undo\" (click)=\"undoData()\">UNDO</button>\n             <button *ngIf=\"categorybox\" id=\"redo\" (click)=\"redoData()\">REDO</button>\n             <button *ngIf=\"categorybox\" id=\"save\" (click)=\"saveData()\">Save</button>\n            <select *ngIf=\"categorybox\" #t  (change)=\"filterData(t.value)\">\n                <option value=\"\" disabled selected>Filter according to:</option>\n                <option *ngFor=\"#cb of categorybox\" [value]=\"cb\">{{cb}}</option>\n            </select>\n            <table id=\"myTable\">\n            <thead>\n                <tr style=\"border:2px solid dark margin:80px\">\n                    <th id=\"head\" *ngFor=\"#head of heads\" contenteditable=\"true\">\n                        {{head}}\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"#dat of data; #i = index\">\n                    <td *ngFor=\"#head of heads; #j = index\" contenteditable=\"true\" (focus) = \"storeData($event)\" (blur)=\"checkHead($event,head,i,j)\" >\n                        {{dat[head]}}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        ",
                        styleUrls: ['app/style/tablestyle.css'],
                        providers: [spsheet_service_1.SpsheetService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, spsheet_service_1.SpsheetService])
                ], SpsheetComponent);
                return SpsheetComponent;
            }());
            exports_1("SpsheetComponent", SpsheetComponent);
        }
    }
});
//# sourceMappingURL=spsheet.component.js.map