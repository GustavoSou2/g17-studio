import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'roi-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './roi-calculator.html',
  styleUrl: './roi-calculator.scss',
})
export class RoiCalculator {
  // Entradas do usuário
  custoAtualMensal: number | null = null;
  leadsGeradosMensal: number | null = null;
  taxaConversaoAtual: number | null = null; // em percentual
  valorMedioVenda: number | null = null;

  // Nossas projeções (você pode ajustar esses valores ou torná-los configuráveis)
  aumentoLeadsPercentual: number = 30; // Ex: Aumentamos leads em 30%
  aumentoConversaoPercentual: number = 15; // Ex: Aumentamos taxa de conversão em 15%
  custoNossoServicoMensal: number = 500; // Ex: Nosso serviço custa R$ 500/mês

  // Resultados
  roiPotencial: number | null = null;
  lucroAdicionalMensal: number | null = null;
  valorTotalAdicionalAnual: number | null = null;

  // Estado da calculadora
  calculado: boolean = false;
  loading: boolean = false;

  constructor() {}

  calcularROI(): void {
    this.loading = true;
    this.calculado = false; // Resetar para esconder resultado antigo durante o cálculo

    // Simula um delay para a animação de loading
    if (
      this.custoAtualMensal === null ||
      this.leadsGeradosMensal === null ||
      this.taxaConversaoAtual === null ||
      this.valorMedioVenda === null
    ) {
      alert('Por favor, preencha todos os campos para calcular.');
      this.loading = false;
      return;
    }

    // Convertendo taxa de conversão para decimal
    const taxaConversaoAtualDecimal = this.taxaConversaoAtual / 100;

    // Calcular vendas atuais
    const vendasAtuais = this.leadsGeradosMensal * taxaConversaoAtualDecimal;
    const receitaAtual = vendasAtuais * this.valorMedioVenda;

    // --- Projeções com nosso serviço ---
    const novosLeads = this.leadsGeradosMensal * (1 + this.aumentoLeadsPercentual / 100);
    const novaTaxaConversaoDecimal =
      taxaConversaoAtualDecimal * (1 + this.aumentoConversaoPercentual / 100);

    const novasVendasProjetadas = novosLeads * novaTaxaConversaoDecimal;
    const novaReceitaProjetada = novasVendasProjetadas * this.valorMedioVenda;

    // Lucro Adicional (receita projetada - receita atual)
    this.lucroAdicionalMensal = novaReceitaProjetada - receitaAtual;

    // Custo total com nosso serviço
    const custoTotalComServico = this.custoAtualMensal + this.custoNossoServicoMensal;

    // ROI = (Lucro Adicional - Custo do Serviço) / Custo do Serviço * 100
    if (this.custoNossoServicoMensal > 0) {
      this.roiPotencial =
        ((this.lucroAdicionalMensal - this.custoNossoServicoMensal) /
          this.custoNossoServicoMensal) *
        100;
    } else {
      this.roiPotencial = 9999; // ROI muito alto se o custo for zero ou negativo
    }

    this.valorTotalAdicionalAnual = this.lucroAdicionalMensal * 12;

    this.calculado = true;
    this.loading = false;
  }

  // Função para formatar moeda
  formatCurrency(value: number | null): string {
    if (value === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  }

  // Função para formatar percentual
  formatPercent(value: number | null): string {
    if (value === null) return '0%';
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value / 100); // Divide por 100 porque Intl.NumberFormat espera um decimal
  }
}
