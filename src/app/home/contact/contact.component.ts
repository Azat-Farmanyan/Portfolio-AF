import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
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
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('contactBody', { static: false }) contactBody!: ElementRef;
  @ViewChild('contactFormWrapper', { static: false }) contactFormWrapper!: ElementRef;
  @ViewChild('contactSocial', { static: false }) contactSocial!: ElementRef;

  messageForm: FormGroup;
  private intersectionObserver?: IntersectionObserver;

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

  ngAfterViewInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
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

  private setupScrollAnimation(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback для браузеров без поддержки IntersectionObserver
      setTimeout(() => {
        if (this.contactFormWrapper) {
          this.contactFormWrapper.nativeElement.classList.add('visible');
        }
        if (this.contactSocial) {
          this.contactSocial.nativeElement.classList.add('visible');
        }
      }, 100);
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Срабатывает, когда 15% элемента видно
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Отключаем наблюдение после появления, чтобы анимация не повторялась
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, options);

    // Наблюдаем за элементами после небольшой задержки, чтобы DOM был готов
    setTimeout(() => {
      const elements = [
        { ref: this.contactFormWrapper, delay: 0 },
        { ref: this.contactSocial, delay: 200 }
      ];

      elements.forEach(({ ref, delay }) => {
        if (ref) {
          setTimeout(() => {
            const element = ref.nativeElement;
            // Проверяем, виден ли элемент уже при загрузке
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
              // Если элемент уже виден, добавляем класс с небольшой задержкой
              setTimeout(() => {
                element.classList.add('visible');
              }, 100);
            } else {
              // Иначе начинаем наблюдение
              this.intersectionObserver?.observe(element);
            }
          }, delay);
        }
      });
    }, 100);
  }
}
