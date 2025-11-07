import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, type FormGroup } from '@angular/forms';
import { PhoneMaskDirective } from '../../core/directives/phone-mask/phone-mask.directive';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toast/toast.service';

declare var gtag: any;

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, ReactiveFormsModule, PhoneMaskDirective],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  private router = inject(Router);
  private toastr = inject(ToastService);

  currentStep = 0;
  steps = [
    { title: 'Vamos começar', subtitle: 'Precisamos de algumas informações básicas' },
    { title: 'Sobre sua empresa', subtitle: 'Queremos entender seu negócio' },
    { title: 'Seus objetivos', subtitle: 'O que você espera alcançar com o site' },
    { title: 'Finalização', subtitle: 'Obrigado por compartilhar essas informações' },
  ];

  nav(url = '/agendamento') {
    this.router.navigateByUrl(url);
  }

  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    company: ['', [Validators.required]],
    industry: ['', [Validators.required]],
    hasWebsite: ['', [Validators.required]],
    goal: [''],
    acquisition: [''],
    consent: [false, [Validators.requiredTrue]],
  });

  constructor() {}

  nextStep() {
    gtag('event', 'onboading', {
      event_category: 'Etapas',
      event_label: 'Etapa ' + (this.currentStep + 1),
    });
    
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
    if (this.currentStep == this.steps.length - 1) this.sendData();
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  sendDataAndMeet() {
    this.nav();
  }

  async sendData() {
    const formValue = this.form.value;

    await fetch('https://formspree.io/f/mvgvegaa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _subject: 'G17 Studio - Nova ideia',
        ...formValue,
      }),
    }).then(() => {
      this.toastr.addToast('Sucesso', 'Formulário enviado com sucesso!');
    });
  }
}
