export class FormState {}

export class FormSubmitted extends FormState {}
export class FormDirty extends FormState {}
export class FormNewMode extends FormState {}

export class FormSubmissionSucceed extends FormState {}

export class FormSubmissionFailed extends FormState {
  error: string;
  constructor(error: string) {
    super();
    this.error = error;
  }
}
