import { Controller, Get, Post, Render, Body, BadRequestException } from '@nestjs/common';
import { ImcDto } from './imc.dto';

@Controller('imc')
export class ImcController {
  @Get()
  @Render('imc-form') // Renderiza o formulário usando Handlebars
  getForm() {
    return {};
  }

  @Post()
  @Render('imc-result') // Renderiza o resultado do IMC
  calculateIMC(@Body() imcDto: ImcDto) {
    const { height, weight } = imcDto;

    // Validando os valores de altura e peso
    if (!height || !weight || height <= 0 || weight <= 0) {
      throw new BadRequestException('Altura e peso devem ser números positivos.');
    }

    const imc = weight / (height * height);

    return {
      imc: imc.toFixed(2),
      height: height.toFixed(2),
      weight: weight.toFixed(2),
      message: this.getIMCMessage(imc),
    };
  }

  private getIMCMessage(imc: number): string {
    if (imc < 18.5) {
      return 'Você está abaixo do peso ideal.';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Você está com o peso normal.';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Você está com sobrepeso.';
    } else {
      return 'Você está com obesidade.';
    }
  }
}
