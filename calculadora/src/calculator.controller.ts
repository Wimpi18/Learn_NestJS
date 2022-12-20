import { Controller, Get, Post, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) { }

  @Post()
  plus(@Query('a') a: number, @Query('b') b: number) {
    return this.calculatorService.plus(a, b);
  }

  @Post()
  minus(@Query('a') a: number, @Query('b') b: number) {
    return this.calculatorService.minus(a, b);
  }

  @Post()
  multiply(@Query('a') a: number, @Query('b') b: number) {
    return this.calculatorService.multiply(a, b);
  }

  @Post()
  division(@Query('a') a: number, @Query('b') b: number) {
    return this.calculatorService.division(a, b);
  }
}
