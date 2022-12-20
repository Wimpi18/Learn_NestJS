import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
    plus(a: number, b: number): number {
        console.log(a + b);
        return a + b;
    }

    minus(a: number, b: number): number {
        console.log(a - b);
        return a - b;
    }

    multiply(a: number, b: number): number {
        console.log(a * b);
        return a * b;
    }

    division(a: number, b: number): number {
        console.log(a / b);
        return a / b;
    }
}
