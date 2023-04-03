import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cards: any[] = [];
  sort: string = '';

  ngOnInit(){
    this.fetchData();
  }

  constructor(private http: HttpClient) {}

  duplicateCard(card: any): void {
    const newCard = { ...card, duplicates: 0, origin: this.cards.indexOf(card) };
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
    const card = this.cards[index];
    if(card.origin !== undefined)
    {
      this.cards[card.origin].duplicates--;

      const baseName = this.cards[card.origin].name.split('#')[0]; // after deleted get the number
      let duplicateCounter = 1; //new counter

      //loop cards to change the count of card if the lower card # is deleted
      this.cards.forEach((c, i) => {
        if(c.origin === card.origin && i !== index)
        {
          c.name = `${baseName}#${duplicateCounter}`;
          duplicateCounter++;
        }
      })
    }

    this.cards.splice(index, 1);
  }

  sortCards(): void {
    if(this.sort === 'name')
    {
      this.cards.sort((a, b) => a.name.localeCompare(b.name));
    } else if(this.sort === 'age')
    {
      this.cards.sort((a,b ) => a.age - b.age);
    }
  }
}
