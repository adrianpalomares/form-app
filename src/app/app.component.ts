import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-app';
  applicationForm: FormGroup;
  flashMessage: string = '';

  // For requests
  URL = 'http://localhost:8080/customers';
  options = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.applicationForm = this.fb.group({
      firstname: '',
      lastname: '',
      middleInitial: '',
      // L.A. County Employee No.
      employeeNumber: '',
      hostedId: '',
      departmentEmailAddress: '',
      departmentName: '',
      departmentNumber: '',
      businessStreetAddress: '',
      city: '',
      zip: '',
      phoneNumber: '',
    });
  }

  onSubmit(): void {
    console.log(this.applicationForm.value);
    // Saving values to localStorage
    localStorage.setItem(
      'applicationForm',
      JSON.stringify(this.applicationForm.value)
    );

    this.http
      .get(this.URL, this.options)
      .toPromise()
      .then((res) => console.log(res));
    // Clearing the form
    this.applicationForm.setValue({
      firstname: '',
      lastname: '',
      middleInitial: '',
      employeeNumber: '',
      hostedId: '',
      departmentEmailAddress: '',
      departmentName: '',
      departmentNumber: '',
      businessStreetAddress: '',
      city: '',
      zip: '',
      phoneNumber: '',
    });
    // Adding a flashMessage to show that
    // the form was submitted
    this.flashMessage = 'Form submitted!';
  }

  handleEditClick(event: Event): void {
    // TODO: If there is no form in localStorage => flash message
    // Read from localStorage
    const applicationFormLS = JSON.parse(
      localStorage.getItem('applicationForm')
    );
    this.applicationForm.setValue(applicationFormLS);
  }
}
