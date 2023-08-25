import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { fadeInOut } from 'src/app/shared/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInOut],
})
export class ContactComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.focusNextInput();
    if (this.messageForm.valid) {
      // console.log(this.messageForm.value);
      this.messageForm.reset();
    }
  }

  focusNextInput() {
    if (document.activeElement === this.nameInput.nativeElement) {
      this.renderer.selectRootElement(this.emailInput.nativeElement).focus();
    } else if (document.activeElement === this.emailInput.nativeElement) {
      this.renderer.selectRootElement(this.messageInput.nativeElement).focus();
    }
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
