import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { fadeInOut } from 'src/app/shared/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInOut],
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    console.log(this.messageForm.value);
    this.messageForm.reset();
  }

  checkFormControlValid(controlName: string) {
    return (
      this.messageForm.get(controlName)?.invalid &&
      this.messageForm.get(controlName)?.touched
    );
  }

  get nameHasError() {
    return (
      this.messageForm.get('name')?.invalid &&
      this.messageForm.get('name')?.touched
    );
  }

  get emailHasError() {
    return (
      this.messageForm.get('email')?.invalid &&
      this.messageForm.get('email')?.touched
    );
  }

  get messageHasError() {
    return (
      this.messageForm.get('message')?.invalid &&
      this.messageForm.get('message')?.touched
    );
  }
}
