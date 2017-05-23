import { ChangeDetectionStrategy, Component, Input, ElementRef } from '@angular/core';
import { HTTPService } from './http-service';
import {PaginationInstance} from '../../node_modules/ngx-pagination';
declare var $:any;

interface Cdata {
	Description: string;
	ImageUrl: string;
	Name: string;
	id: string
}

interface apiOffset {
	url: string;
	page: string;
}

interface cDatas extends Array<Cdata>{}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class AppComponent {
	@Input('data') code:any = new Object([]);
	page: number = 1;
	time: string;
	title = 'API catalogue checker';
	total: string;
	public tags: string[] = [];
	public tag: string[] = [];
	check: boolean = false;
	productsFilter: boolean = false;
	APILink: string;
	empty: boolean = false;
	output: boolean = false;
	outputfile: string;
	datafile: string;

	// Api pagination configuration
	pagination: string[] = [];

	public query = '';
    public filteredList = [];
    public elementRef;

	constructor(private _httpservice: HTTPService, myElement: ElementRef) {
		$("body").addClass("done");
		this.elementRef = myElement;
	}

	filter() {
	    if (this.query !== ""){
	        this.filteredList = this.tags.filter(function(el){
	            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
	        }.bind(this));
	    }else{
	        this.filteredList = [];
	    }
	}
	 
	select(item, APILink){
	    this.empty = false;
	    this.query = '';
	    this.productsFilter = true;
	    this.tag.push(item)
	    var apinew = this.APILink+ '&filter=id:';
	    //console.log(this.filteredList);
	    this.tags = this.tags.filter((value)=>value!=item);
	    if(this.tag.length > 1) {
	    	apinew = apinew + this.tag.join();
		    this._httpservice.getQuery(apinew).subscribe(data => { this.code = data.Results})
	    } else {
	    	apinew = apinew + item;
		    this._httpservice.getQuery(apinew).subscribe(data => { this.code = data.Results})
	    }
	    this.filteredList = [];
	}

	get(apicall) {
		//console.info(apicall);
        this.check = true;
		this.httprequest(apicall);
	}

	update(e) {
		var idAttr = e.srcElement.attributes.id;
	    var value = idAttr.nodeValue;
	    //console.log(value);
		this._httpservice.getQuery(value).subscribe(
			data => {
				this.code = data.Results,
				this.total = data.TotalResults,
				data.Results.forEach(element => { 
					this.tags.push(element.Id)
				})
			}, () => console.log('Updated!')
		);
	}

	httprequest(arg) {
		this._httpservice.getQuery(arg).subscribe(
			data => {
				let page:number = (data.TotalResults / data.Limit);
				let i:number;

				if(page != Math.floor(page)) {
					page = Math.floor(page) + 1;
					for(i = 0; i < page; i++) {
						if(i==0) {
							this.code = data.Results,
							this.APILink = arg,
							//console.log(this.code),
							this.total = data.TotalResults,
							data.Results.forEach(element => { 
								this.tags.push(element.Id)
							})
						} else {
							var set = i * data.Limit;
							var newurl = arg + "&offset=" + set;
							this._httpservice.getQuery(newurl).subscribe(
								data => {
									//let newOb:any = new Object({ 'Description': data.Results[i].Description, 'ImageUrl': data.Results[i].ImageUrl, 'Name': data.Results[i].Name, 'Id': data.Results[i].Id });
									//console.log(newOb)
									//this.code.push(data.Results),
									data.Results.forEach(element => { 
										let newOb:any = new Object({ 'Description': element.Description, 'ImageUrl': element.ImageUrl, 'Name': element.Name, 'Id': element.Id });
										this.code.push(newOb)
										this.tags.push(element.Id)
									})
								}, () => console.log('Final :' + this.code))
							let newObject:any = new Object({ 'newurl' : newurl })
							this.pagination.push(newObject);
						}
					}
				}
			},
			error => alert(error),
			() => console.log('Data loaded successfully!')
		);
	}

	export() {
		this.output = true;
		this._httpservice.createXml(this.code).subscribe(data => {
			this.datafile = data.url,
			this.outputfile = 'http://alexisphanor.com/' + data.url;
		},
		error => console.error(error));
	}
}
