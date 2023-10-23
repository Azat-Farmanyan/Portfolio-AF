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

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  submit(e: Event) {
    this.focusNextInput();
    if (this.messageForm.valid) {
      // Service ID: service_3cxa21c
      // Template ID: template_jawmbjg
      // Public Key: rOMe2slLxXTWyfjfQ

      emailjs
        .sendForm(
          'service_3cxa21c',
          'template_jawmbjg',
          e.target as HTMLFormElement,
          'rOMe2slLxXTWyfjfQ'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            this.toastr.success(
              'Thank you for getting in touch. Your message has been received, and I will get back to you as soon as possible.',
              'Message Sent Successfully!'
            );
          },
          (error) => {
            this.toastr.error(
              'Oops, something went wrong while sending your message. Please double-check your internet connection and try again. If the issue persists, you can also reach out to me via email at azat.farmanyan905@gmail.com.',
              'Message Delivery Failed!'
            );
          }
        );

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
