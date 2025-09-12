import { defineRule } from 'vee-validate';
import { required, min, email } from "@vee-validate/rules";
import { numeric } from '@vee-validate/rules';

export const validate = () => {
    defineRule('numeric', numeric);
    defineRule('required', required);
    defineRule('min', min);
    defineRule('email', email);
};
export default defineNuxtPlugin(() => {
 validate();
});