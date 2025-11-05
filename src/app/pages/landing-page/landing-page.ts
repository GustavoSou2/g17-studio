import { CommonModule } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { RoiCalculator } from '../../features/roi-calculator/roi-calculator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RoiCalculator],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private router = inject(Router);

  // Hero content
  phrases = [
    {
      title: 'Cada visitante que não entra em contato é dinheiro perdido',
      description:
        'Se você recebe visitas no site mas não há incentivo claro para o cliente entrar em contato, você está deixando oportunidades de vendas escaparem.',
    },
    {
      title: 'Empresas sem site otimizado perdem até 40% dos clientes online',
      description:
        'Sites lentos, mal estruturados ou não responsivos fazem o visitante desistir antes de conhecer seu serviço.',
    },
    {
      title: '5 visitantes perdidos/dia = R$1500/mês desperdiçados',
      description:
        'Cada potencial cliente que não entra em contato representa receita que você poderia ter obtido com pequenas melhorias no seu site.',
    },
    {
      title: 'Sites lentos reduzem até 50% da conversão',
      description:
        'Se o site demora a carregar ou não é intuitivo, o visitante abandona antes de solicitar orçamento.',
    },
    {
      title: 'Seu concorrente captura clientes que poderiam ser seus',
      description:
        'Enquanto você não otimiza sua presença digital, outros negócios capturam leads que você poderia converter.',
    },
    {
      title: 'Formulários não preenchidos = oportunidades perdidas',
      description:
        'Cada lead que não preenche um formulário ou não envia mensagem representa uma venda que não acontece.',
    },
    {
      title: 'Não medir conversões é gastar dinheiro sem saber se funciona',
      description:
        'Sem métricas, você não sabe se seu marketing gera resultado e pode desperdiçar investimento.',
    },
    {
      title: '1 em cada 10 leads perdidos = 10x investimento desperdiçado',
      description: 'Quando leads não se convertem, o dinheiro gasto em tráfego não gera retorno.',
    },
    {
      title: 'Agendamento difícil significa perder clientes',
      description:
        'Se é complicado marcar reunião ou orçamento, o cliente vai buscar alternativas mais fáceis.',
    },
    {
      title: 'Cada visita que não vira contato = receita perdida',
      description:
        'Mesmo pequenas melhorias de UX podem aumentar consideravelmente seu faturamento.',
    },
    {
      title: 'Clientes que não encontram seu site vão para o concorrente',
      description:
        'Sem SEO ou presença digital estruturada, você deixa de ser a primeira escolha do cliente.',
    },
    {
      title: 'Cada dia sem conversão = dinheiro parado',
      description: 'Quanto mais tempo seu site fica sem gerar leads, mais você deixa de lucrar.',
    },
    {
      title: 'Sites não otimizados perdem 30-60% do tráfego orgânico',
      description: 'Uma boa otimização aumenta a visibilidade sem gastar mais com anúncios.',
    },
    {
      title: '10 leads perdidos/semana = R$20.000/ano desperdiçados',
      description: 'A falta de estrutura para captar e converter leads custa dinheiro direto.',
    },
    {
      title: 'Não ter site profissional = loja fechada para metade dos clientes',
      description:
        'Mesmo que você apareça no Instagram, clientes preferem confiança e facilidade que um site transmite.',
    },
    {
      title: 'Seu site não vende porque fala de você, não do cliente',
      description:
        'A maioria dos sites são egocêntricos — falam da empresa, não da dor que o cliente quer resolver. Quando você muda a comunicação para o resultado que o cliente busca, a conversão aumenta instantaneamente.',
    },
    {
      title: 'Se você não mede, não melhora — e quem não melhora, perde mercado',
      description:
        'Sem métricas de comportamento e conversão, você nunca sabe o que está funcionando. Isso faz você continuar investindo em estratégias erradas enquanto os concorrentes otimizam o lucro.',
    },
    {
      title: 'Campanhas sem página de destino convertem até 70% menos',
      description:
        'Anunciar sem levar o visitante para uma página feita para converter é desperdiçar dinheiro. Uma landing page bem estruturada direciona a atenção do usuário e multiplica o retorno sobre o investimento.',
    },
    {
      title: 'A falta de dados transforma marketing em sorte, não em estratégia',
      description:
        'Sem acompanhar métricas de origem, comportamento e conversão, você baseia decisões em achismos. O resultado é gastar mais e vender menos do que poderia.',
    },
  ];

  getPosition(i: number) {
    const left = (Math.random() - 0.5) * 20;
    const top = Math.random() * 10;

    return {
      left: `calc(${left}% + 10px)`,
      top: `calc(${top}% + 10px)`,
      transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
    };
  }

  // info {}

  info = [
    'Seu site não aparece no Google',
    'Seus clientes não entendem seu valor',
    'Você depende do Instagram para vender',
    'Você recebe visitas, mas ninguém entra em contato',
  ];

  // results

  titulo = 'Nosso processo foi criado para gerar resultado previsível.';

  etapas = [
    {
      numero: 1,
      titulo: 'Diagnóstico',
      descricao: 'Entendemos onde seu negócio perde oportunidades online.',
      // Você pode usar SVG inline aqui ou classes para ícones como Heroicons/Font Awesome
      iconeSVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773zm-2.545-1.474L5.773 17.5m11.956-.274l-4.773-4.773" /></svg>`,
    },
    {
      numero: 2,
      titulo: 'Planejamento estratégico',
      descricao: 'Desenhamos o funil de conversão e a experiência do usuário.',
      iconeSVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.124.75.75 0 01-.195.319L2.433 21.02a.75.75 0 00.956.956l3.432-1.894a.75.75 0 01.319-.195 3 3 0 001.124-5.78zM15.75 14.25a3 3 0 00-5.78 1.124.75.75 0 01-.195.319l-1.793 3.432a.75.75 0 00.956.956l3.432-1.894a.75.75 0 01.319-.195 3 3 0 001.124-5.78zM19.5 7.5a3 3 0 00-5.78 1.124.75.75 0 01-.195.319L12.02 12.433a.75.75 0 00.956.956l3.432-1.894a.75.75 0 01.319-.195 3 3 0 001.124-5.78z" /></svg>`,
    },
    {
      numero: 3,
      titulo: 'Desenvolvimento sob medida',
      descricao: 'Performance, SEO e automações integradas.',
      iconeSVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0l3-2.25-3-2.25M12 18.75l3-2.25 3 2.25M9 18.75l-3-2.25-3 2.25M21 12H3" /></svg>`,
    },
    {
      numero: 4,
      titulo: 'Lançamento e crescimento',
      descricao: 'Medimos, otimizamos e escalamos seu ROI.',
      iconeSVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.305a11.164 11.164 0 005.13-2.75l2.75 2.75m-1.625-7.375h-7.5m7.5 0h7.5m0 0v7.5m0-7.5v-7.5" /></svg>`,
    },
  ];

  // beneft
  benetitulo = 'Tecnologia é só o meio. O fim é o resultado.';

  beneficios = [
    {
      icone: '🚀', // Emoji ou substitua por SVG
      titulo: 'Mais visibilidade',
      descricao: 'Otimização SEO para você aparecer no Google.',
      classPadding: 'pl-[0px]',
    },
    {
      icone: '💰',
      titulo: 'Mais conversões',
      descricao: 'Estrutura pensada para gerar contatos e vendas.',
      classPadding: 'pl-[140px]',
    },
    {
      icone: '⚙️',
      titulo: 'Menos trabalho',
      descricao: 'Sites integrados com WhatsApp, CRM e redes sociais.',
      classPadding: 'pl-[360px] ',
    },
    {
      icone: '📈',
      titulo: 'Mais controle',
      descricao: 'Painel com métricas e relatórios de desempenho.',
      classPadding: 'pl-[600px] ',
    },
  ];

  // Services
  services = [
    {
      icon: 'Monitor',
      title: 'Sites Institucionais',
      description: 'Landing pages e sites corporativos com foco em conversão',
      benefits: [
        'Design responsivo',
        'SEO otimizado',
        'Carregamento rápido',
        'Analytics integrado',
      ],
      ringClass: 'ring-cyan-500', // Classe para a borda/anel
      gradientClass: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:bg-gradient-to-tl',
    },
    {
      icon: 'Settings',
      title: 'Sistemas Web',
      description: 'Dashboards, CRMs e aplicações personalizadas para seu negócio',
      benefits: [
        'Arquitetura escalável',
        'Segurança avançada',
        'APIs robustas',
        'Interface intuitiva',
      ],
      ringClass: 'ring-lime-500',
      gradientClass: 'bg-gradient-to-br from-lime-500/10 to-green-500/10 hover:bg-gradient-to-tl',
    },
    {
      icon: 'Palette',
      title: 'Web Design UX/UI',
      description: 'Interfaces que convertem visitantes em clientes',
      benefits: ['Prototipagem no Figma', 'Testes de usabilidade', 'Design system', 'Mobile-first'],
      ringClass: 'ring-yellow-500',
      gradientClass:
        'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:bg-gradient-to-tl',
    },
    {
      icon: 'MessageSquare',
      title: 'Consultoria Técnica',
      description: 'Análise e estratégias para otimizar sua presença digital',
      benefits: [
        'Auditoria técnica',
        'Plano de melhorias',
        'Mentoria em código',
        'Arquitetura de software',
      ],
      ringClass: 'ring-pink-500',
      gradientClass: 'bg-gradient-to-br from-pink-500/10 to-purple-500/10 hover:bg-gradient-to-tl',
    },
    {
      icon: 'PenTool',
      title: 'Copywriting',
      description: 'Textos persuasivos que aumentam suas conversões',
      benefits: ['Headlines impactantes', 'CTAs eficazes', 'Storytelling', 'Psicologia da venda'],
      ringClass: 'ring-indigo-500',
      gradientClass:
        'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 hover:bg-gradient-to-tl',
    },
    {
      icon: 'Zap',
      title: 'SEO & Performance',
      description: 'Otimização para motores de busca e velocidade',
      benefits: [
        'Core Web Vitals',
        'Estrutura semântica',
        'Meta tags otimizadas',
        'Compressão de assets',
      ],
      ringClass: 'ring-teal-500',
      gradientClass: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 hover:bg-gradient-to-tl',
    },
  ];

  // Nav to
  nav(url = '/agendamento') {
    this.router.navigateByUrl(url);
  }

  scrollToElement(elementId: string, offset = 80) {
    const el = document.getElementById(elementId);
    console.log(el)
    if (!el) return;

    const offsetTop = el.getBoundingClientRect().top + window.scrollY - offset;

    console.log(offsetTop)
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }

  // footer 
  currentYear = new Date().getFullYear();
}
