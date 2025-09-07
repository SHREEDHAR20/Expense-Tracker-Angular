import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private API = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.API);
  }

  addExpense(expense: Expense): Observable<any> {
    return this.http.post(this.API, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
