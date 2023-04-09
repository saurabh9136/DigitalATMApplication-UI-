import { Component } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {

  cardNumber='';
  pin='';
  amount='';

  constructor(private backendservice : BackendService){}

  onSubmit() {
    this.backendservice.withdraw(this.cardNumber,this.pin,this.amount).subscribe
    (response=>{
      alert(response);
    },error=>{
      alert(error.error);
    });
    
  }
}
