import { FormControl, FormGroup, Validators } from "@angular/forms";
export class CustomerLoginViewModel {
    constructor() {
        this.EMail = new FormControl("", Validators.compose([Validators.email, Validators.required]));
        this.Password = new FormControl("", Validators.compose([Validators.required]));
        this.LoginGroup = new FormGroup({ EMail: this.EMail, Password: this.Password });
    }
    Errors() {
        var errMessages = [];
        for (var name in this.LoginGroup.controls) {
            for (var err in this.LoginGroup.controls[name].errors) {
                switch (err) {
                    case 'email':
                        errMessages.push(`${name} is invalid`);
                        break;
                    case 'required':
                        errMessages.push(`${name} is required`);
                        break;
                }
            }
        }
        return errMessages;
    }
}
export class CartProducts {
}
//# sourceMappingURL=ViewModels.js.map