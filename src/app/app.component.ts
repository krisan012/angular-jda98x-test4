import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cards: any[] = [];
  sort: '';

  ngOnInit(){
    this.fetchData();
  }

  constructor(private http: HttpClient) {}

  duplicateCard(card: any): void {
    console.log('duplicate');
    const newCard = { ...card, duplicates: 0 };
    newCard.name = `${card.name}#${card.duplicates + 1}`; //new name of duplicated card
    card.duplicates++; //increase duplicate count

    this.cards.push(newCard);
  }

  fetchData(): void {
    this.http
      .get('https://dummyjson.com/users?count=10')
      .subscribe((response: any) => {
        this.cards = response.users.slice(0,10).map((user: any) => {
          return {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            gender: user.gender,
            telephone: user.phone,
            duplicates: 0,
          };
        });
      });
  }

  deleteCard(index: number): void {
    console.log(index)
    this.cards.splice(index, 1);
  }

  sortCards(event: Event): void {
    console.log(this.sort)
  }
}
