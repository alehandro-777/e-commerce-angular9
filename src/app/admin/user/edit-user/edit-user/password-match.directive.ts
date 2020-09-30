import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {

    return  (control: FormGroup) => {
        
        const name = control.get('password');
        const alterEgo = control.get('password_r');

        if (!name || !alterEgo) {
            return null;
          }

        return name.value == alterEgo.value ?  null : { passwordsnotmatch: true } };
}
