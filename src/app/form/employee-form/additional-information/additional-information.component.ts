import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.css'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '400ms',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '400ms',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AdditionalInformationComponent implements OnInit {
  // Functions from parent component (employee-form)
  @Input() printForm: () => void;
  @Input() save: () => void;

  // These variable represent if the user wants access to these items
  internetAccess: boolean;
  emailAccount: boolean;
  emailEncryption: boolean;
  laCountyAccess: boolean;
  tokenlessAuth: boolean;
  lacMobile: boolean;
  cherwellSMS: boolean;
  windowsManagement: boolean;

  // Options will be used for the chips
  options = new Set();

  constructor() {}

  ngOnInit(): void {
    this.internetAccess = false;
    this.emailAccount = false;
    this.emailEncryption = false;
    this.laCountyAccess = false;
    this.tokenlessAuth = false;
    this.lacMobile = false;
    this.cherwellSMS = false;
    this.windowsManagement = false;
  }

  /**
   *
   * @param event This is the event that comes from the button. Contains information such as: checked
   * @param nameOfOption This is the name of the option to be added to the chiplist
   */
  onButtonChange(event: MatButtonToggleChange, nameOfOption: string): void {
    // Change to variable to represent the status of the button, whether clicked or not
    this[event.source.id] = event.source.checked;

    // Add the option to options, to be represented in the chiplist
    if (event.source.checked) {
      this.options.add(nameOfOption);
    } else {
      this.options.delete(nameOfOption);
    }
  }

  // FOR TESTING PURPOSES
  sampleFunction(): void {
    console.log('Internet Access: ', this.internetAccess);
    console.log('Email Account: ', this.emailAccount);
    console.log('Email Encryption: ', this.emailEncryption);
    console.log('La County Access: ', this.laCountyAccess);
    console.log('Tokenless Auth: ', this.tokenlessAuth);
    console.log('lacMobile: ', this.lacMobile);
    console.log('Cherwell', this.cherwellSMS);
    console.log('Windows: ', this.windowsManagement);
  }
}
