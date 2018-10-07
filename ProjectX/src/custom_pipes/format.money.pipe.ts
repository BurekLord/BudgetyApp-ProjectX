import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {
    currency: string;
    transform(money: number) {
        // currency will be worked on, string literal for now
        this.currency = '$';
        // array of digits form given number
        let digits: string[];
        digits = money.toString().split('');
        // final array of formated number with dots to be converted to string
        const formatedDigits: string[] = [];
        let formatedMoney = '';
        let dotPoint = digits.length - 1;
        for (let i = digits.length - 1; i > -1; i--) {
            if (i === dotPoint - 3) {
                formatedDigits.unshift(digits[i] + '.');
                dotPoint -= 3;
            } else {
                formatedDigits.unshift(digits[i]);
            }
        }
        // create final string joining elements of formatedDigits array
        formatedMoney = formatedDigits.join('') + this.currency;
        return formatedMoney;
    }
}
