import { Component, OnInit } from '@angular/core';
import { ApiBaresService } from '../api-bares.service';
import { MessageService } from 'primeng/api';


interface CardData {
  nombre: string;
  email: string;
  opinion: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
 title='consumirApi';
 userList:any = [];

 

 constructor(private userService: ApiBaresService, private messageService: MessageService ){}
 cards: CardData[] = [];

 agregarCard(card: CardData) {
   this.cards.push(card);
 }

 ngOnInit(): void {
    this.userService.getUsers().subscribe((response: any) => this.userList = response);
 }
 }




