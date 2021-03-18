import { Component,OnInit } from '@angular/core';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {LocalStorageService} from 'ngx-webstorage'
import { MatDialog } from '@angular/material/dialog';
import {SepComponent} from './sep/sep.component';
import {AepComponent} from './aep/aep.component';
import {DepComponent} from './dep/dep.component';
import { ProfileComponent } from './profile/profile.component';
import { PayComponent } from './pay/pay.component';
import {HttpClient} from '@angular/common/http';
declare var Razorpay:any;

interface sizes{
	xs:number;
	s:number;
	m:number;
	l:number;
	xl:number;
	xxl:number;
	xxxl:number;
}

interface orders{
	dark:sizes;
	white:sizes;
}

interface pay{
	user:SocialUser;
	order:orders;
	details;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	user:any;
	loggedIn:boolean;
	dc:number;
	wc:number;
	w:string = "xs";
	d:string="xs";
	ord:orders;
	log_sub:any;

	cartsw :boolean = true;

	constructor(private authService: SocialAuthService,
		private storage:LocalStorageService,
		public dialog:MatDialog,
		private http:HttpClient){
	  this.user = this.storage.retrieve('user');
      this.loggedIn=(this.user != null);

      this.storage.observe("user").subscribe((user)=>{
      this.user = user;
      this.loggedIn=(user != null);
    })

      if(this.storage.retrieve('orders') == null){
      	      this.ord = {dark:{	xs:0,
	s:0,
	m:0,
	l:0,
	xl:0,
	xxl:0,
	xxxl:0},
	white:{	xs:0,
	s:0,
	m:0,
	l:0,
	xl:0,
	xxl:0,
	xxxl:0}}
this.storage.store("orders",this.ord);
      }
	}
	ngOnInit():void{
 this.ord = this.storage.retrieve('orders');
 if(!this.loggedIn){
 this.pop_notice();
 }
	}
	pop_notice():void{
		const dialogRef = this.dialog.open(AepComponent,{width:'90%',height:"90%",maxWidth:"600px"});
		dialogRef.afterClosed().subscribe(result => {
                     console.log('The notice was closed');
                     this.dialog.closeAll();
                             });
			setTimeout(() => {  this.dialog.closeAll() }, 4000);
	}
	login():void{
		 this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		 this.log_sub = this.authService.authState.subscribe((user:any)=>{
		 	this.http.post("https://fmc-weekend-shirt.herokuapp.com/google/login",{"token":user.idToken} ,{withCredentials:true}).subscribe((res)=>{console.log(res)})
		 	this.storage.store("user",user);
		 });

	}

	signOut():void{
		this.authService.signOut();
		this.storage.clear("user");
		this.storage.clear("orders");
		this.log_sub.unsubscribe();
		this.http.get("https://fmc-weekend-shirt.herokuapp.com/google/logout",{withCredentials:true}).subscribe((res)=>{console.log(res)})

	}

	add(color:string){
		if(color=="dark"){
		this.ord[color][this.d]=this.ord[color][this.d]+1;
		this.storage.store("orders",this.ord)
		//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		this.ord[color][this.w]=this.ord[color][this.w]+1;
		this.storage.store("orders",this.ord)
		//this.wc=this.ord[color][s];
		}
		console.log(this.w,this.d)
	}
    re(color:string){
		if(color=="dark"){
		this.ord[color][this.d]=Math.max(this.ord[color][this.d]-1,0);
		this.storage.store("orders",this.ord)
		//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		this.ord[color][this.w]=Math.max(this.ord[color][this.d]-1,0);
		this.storage.store("orders",this.ord)
		//this.wc=this.ord[color][s];
		}
	}
	buy():void{
		const dialogRef = this.dialog.open(ProfileComponent,{width:'100%',height:"100%",maxWidth:"600px"});

	}

	shift(s:string,color:string){
		if(color=="dark"){
		this.d = s;
		//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		this.w = s;
		//this.wc=this.ord[color][s];
		}
		console.log(this.d,this.w)
	}

	showCart():void{
		if(this.cartsw){
		const dialogRef = this.dialog.open(SepComponent,{width:'90%',height:"90%",maxWidth:"600px"});
		 dialogRef.afterClosed().subscribe(result => {
                     console.log('The cart was closed');
                     this.dialog.closeAll();
                     this.cartsw = !this.cartsw;
                             });
		 this.cartsw = !this.cartsw;
		}
		else{
			this.dialog.closeAll();
			this.cartsw = !this.cartsw;
		}
	}

	tac():void{
		const dialogRef = this.dialog.open(DepComponent,{width:'90%',height:"90%",maxWidth:"600px"});
		dialogRef.afterClosed().subscribe(result => {
                     console.log('The T&C was closed');
                     this.dialog.closeAll();
                             });
	}

	refund():void {
		const dialogRef = this.dialog.open(PayComponent,{width:'90%',height:"90%",maxWidth:"600px"});
		dialogRef.afterClosed().subscribe(result => {
                     console.log('The T&C was closed');
                     this.dialog.closeAll();
                             });
	}



	parseValue(x:any){
		console.log(x)
	}

  title = 'fmc';
}
