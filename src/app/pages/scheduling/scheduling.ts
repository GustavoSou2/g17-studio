import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, type FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from '../../core/directives/phone-mask/phone-mask.directive';
import { SchedulingService, type Appointment } from '../../core/services/scheduling/scheduling';
import { catchError, map, throwError } from 'rxjs';
import { CalendarAuth } from '../../core/services/calendar-auth/calendar-auth';
import { Toastr } from '../../core/toastr/toastr';
import { Router } from '@angular/router';
import { Skeleton } from '../../shared/components/skeleton/skeleton';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-scheduling',
  imports: [CommonModule, ReactiveFormsModule, PhoneMaskDirective, Skeleton],
  templateUrl: './scheduling.html',
  styleUrl: './scheduling.scss',
  providers: [SchedulingService, CalendarAuth],
})
export class Scheduling {
  private _schedulingService = inject(SchedulingService);
  private fb = inject(FormBuilder);
  private calendarAuth = inject(CalendarAuth);
  private toastr = inject(ToastService);
  private router = inject(Router);

  appointmentsState = signal({
    appointments: [],
    error: '',
    status: 'idle',
  });

  appointments = computed(() => this.appointmentsState().appointments);
  error = computed(() => this.appointmentsState().error);
  status = computed(() => this.appointmentsState().status);

  schedulingState = signal({
    error: '',
    status: 'idle',
  });

  schedulingError = computed(() => this.schedulingState().error);
  schedulingStatus = computed(() => this.schedulingState().status);

  calendarAuthState = signal({
    error: '',
    status: 'idle',
  });

  calendarAuthError = computed(() => this.calendarAuthState().error);
  calendarAuthStatus = computed(() => this.calendarAuthState().status);

  appointmentsAsObservable = this.getAppointments()
    .pipe(
      map((appointments) => {
        this.handlerAppointmentsState('appointments', appointments);
        this.handlerAppointmentsState('status', 'success');
        this.handlerSchedulingState('status', 'init');
      })
    )
    .subscribe();

  handlerAppointmentsState(key: string, value: any) {
    this.appointmentsState.update((appointmentsState) => ({
      ...appointmentsState,
      [key]: value,
    }));
  }

  handlerSchedulingState(key: string, value: any) {
    this.schedulingState.update((schedulingState) => ({
      ...schedulingState,
      [key]: value,
    }));
  }

  handlerCalendarAuthState(key: string, value: any) {
    this.schedulingState.update((calendarAuthState) => ({
      ...calendarAuthState,
      [key]: value,
    }));
  }

  step = 1;
  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  currentDay = new Date().getDate();
  currentMonthConditional = new Date().getMonth();
  currentMonth = new Date().getMonth();
  currentYearConditional = new Date().getFullYear();
  currentYear = new Date().getFullYear();

  selectedDay: number | null = null;
  selectedTime: string | null = null;

  selectedDate: Date | null = null;
  isEditableSchedulingDate: boolean = false;

  get isEditing() {
    return this.isEditableSchedulingDate;
  }

  set isEditing(editingStatus: boolean) {
    this.isEditableSchedulingDate = editingStatus;
  }

  availableTimes = ['09:00', '10:30', '11:00', '14:00', '14:30', '15:30', '16:00', '17:00'];

  leadForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    consent: [false, Validators.requiredTrue],
    saveToCalendar: [false],
  });

  constructor() {
    this.handlerAppointmentsState('status', 'loading');
    this.handlerSchedulingState('status', 'init');
  }

  prevMonth() {
    const now = new Date();

    if (this.currentYear === now.getFullYear() && this.currentMonth === now.getMonth()) {
      return;
    }

    this.currentMonth--;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
  }

  isPrevMonthDisabled() {
    const now = new Date();
    return this.currentYear === now.getFullYear() && this.currentMonth <= now.getMonth();
  }

  selectTime(time: string) {
    this.selectedTime = time;

    let isComplete = this.isCompleteSchedulingDate();
    if (isComplete) this.isEditing = false;
  }

  goToNextStep() {
    if (this.selectedDay && this.selectedTime) {
      this.step = 2;
    }
  }

  nav(url = '/agendamento') {
    this.router.navigateByUrl(url);
  }

  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Gera todos os dias (com preenchimento de semanas)
  getDaysInMonth() {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    const firstDayWeekIndex = firstDayOfMonth.getDay(); // 0 = domingo
    const totalDaysInMonth = lastDayOfMonth.getDate();

    // Dias anteriores ao início do mês
    for (let i = firstDayWeekIndex - 1; i >= 0; i--) {
      const prevDate = new Date(this.currentYear, this.currentMonth, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Dias do mês atual
    for (let d = 1; d <= totalDaysInMonth; d++) {
      days.push({
        date: new Date(this.currentYear, this.currentMonth, d),
        isCurrentMonth: true,
      });
    }

    // Completar o restante da grade com dias do próximo mês
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push({
          date: new Date(this.currentYear, this.currentMonth + 1, i),
          isCurrentMonth: false,
        });
      }
    }

    return days;
  }

  isToday(date: Date) {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }

  isSelected(date: Date) {
    return (
      this.selectedDate &&
      this.selectedDate.getDate() === date.getDate() &&
      this.selectedDate.getMonth() === date.getMonth() &&
      this.selectedDate.getFullYear() === date.getFullYear()
    );
  }

  selectDay(date: Date) {
    this.selectedDate = date;

    let isComplete = this.isCompleteSchedulingDate();

    if (isComplete) this.isEditing = false;
  }

  isCompleteSchedulingDate() {
    const isComplete = !!this.selectedDate && !!this.selectedTime;

    return isComplete;
  }

  timeIsHidden(time: string) {
    const day = this.selectedDate?.getDate();
    const month = this.selectedDate?.getMonth();
    const year = this.currentYear;
    const appointmentExistsInDay = this.appointments()?.filter(
      (appointment: Appointment) => appointment.scheduling == `${day}/${month}/${year}`
    );

    return appointmentExistsInDay.some((appointment: Appointment) => appointment.time == time);
  }

  keyDataAlreadyUsed(key: string, value: string) {
    return this.appointments().some(
      (appointment: Appointment) => (appointment as any)[key] == value
    );
  }

  getAppointments() {
    return this._schedulingService.getAppointments();
  }

  addAppointments() {
    const lead = this.leadForm.value;
    const scheduling = `${this.selectedDate?.getDate()}/${this.selectedDate?.getMonth()}/${
      this.currentYear
    }`;

    this._schedulingService
      .addAppointment({
        scheduling,
        time: this.selectedTime,
        ...lead,
      })
      .pipe(
        catchError((err) => {
          this.handlerSchedulingState('status', 'error');
          this.handlerSchedulingState('error', err);

          return throwError(() => err);
        })
      )
      .subscribe(async (data) => {
        this.handlerSchedulingState('status', 'complete');

        await fetch('https://formspree.io/f/mvgvegaa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _subject: 'G17 Studio - Novo agendamento',
            ...lead,
            scheduling,
            time: this.selectedTime,
          }),
        }).then(() => {
          this.toastr.addToast('Sucesso', 'Agendamento realizado com sucesso!');
        });
      });
  }

  addToGoogleCalendar() {
    this.handlerCalendarAuthState('status', 'loading');
    const day = this.selectedDate?.getDate();
    const month = this.selectedDate?.getMonth();
    const year = this.currentYear;
    this.calendarAuth.loginWithGoogle(`${day}/${month}/${year}`, this.selectedTime!).then(() => {
      this.handlerCalendarAuthState('status', 'complete');
      this.toastr.addToast('Sucesso', 'Agendamento realizado com sucesso!');
      this.nav('/');
    });
  }
}
