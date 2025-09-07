import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css'],
  imports :[CommonModule,FormsModule,HttpClientModule],
  standalone: true
})
export class ExpenseList {
   amount: number = 0;
  description: string = '';
  type: string = '';
  customType: string = '';
  showCustomTypeInput: boolean = false;
  expenses: any[] = [];
  showProfile: boolean = false;
  showHistory: boolean = false;
  history: any[] = [];

  user = {
    name: 'Shreedhar',
    email: 'shreedhar@example.com'
  };

  constructor(private http: HttpClient) {}

  onTypeChange() {
    this.showCustomTypeInput = (this.type === 'Other');
    if (!this.showCustomTypeInput) {
      this.customType = '';
    }
  }

  addToTable() {
    let finalType = this.type === 'Other' ? this.customType : this.type;

    if (this.amount && this.description && finalType) {
      this.expenses.push({
        amount: this.amount,
        description: this.description,
        type: finalType
      });

      this.amount = 0;
      this.description = '';
      this.type = '';
      this.customType = '';
      this.showCustomTypeInput = false;
    } else {
      alert('Please fill all fields.');
    }
  }

  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
  }

  saveToDatabase() {
    if (this.expenses.length === 0) {
      alert('No expenses to save.');
      return;
    }

    for (const exp of this.expenses) {
      this.http.post('http://localhost:3000/api/expenses', exp)
        .subscribe({
          next: res => console.log('Saved:', res),
          error: err => console.error('Error:', err)
        });
    }

    alert('All expenses saved to the database!');
    this.expenses = [];
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  loadHistory() {
    this.http.get<any[]>('http://localhost:3000/api/expenses') // GET all user expenses
      .subscribe(data => {
        this.history = data;
        this.showHistory = true;
      });
  }

  logout() {
  window.location.href = '/';  // Redirect to homepage
}


}