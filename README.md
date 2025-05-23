# 🧠 Humor Diário - Mood Tracker App

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-purple?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-cyan?style=for-the-badge&logo=tailwindcss)

### Um aplicativo web para acompanhamento diário do humor e bem-estar emocional

Registre seu humor diário, acompanhe sua evolução e receba insights personalizados para melhorar sua saúde mental

---

## 📱 Sobre o Projeto

O **Humor Diário** é uma aplicação web responsiva desenvolvida para ajudar usuários a monitorar e compreender seus padrões emocionais ao longo do tempo. Com uma interface intuitiva e amigável, o app permite registro diário de humor, visualização de estatísticas e acesso a recursos de apoio emocional.

### ✨ Principais Funcionalidades

- 📊 **Check-in Diário**: Registre seu humor, qualidade do sono e disposição
- 📈 **Visualização de Dados**: Acompanhe sua evolução com gráficos interativos
- 🎯 **Insights Personalizados**: Receba análises sobre seus padrões emocionais
- 💡 **Dicas de Bem-estar**: Acesse conteúdos para melhorar sua saúde mental
- 🆘 **Central de Apoio**: Links diretos para recursos de ajuda emergencial
- 🏆 **Sistema de Streaks**: Motivação através de sequências de registro
- 💾 **Persistência Local**: Seus dados são salvos localmente no navegador

## 🚀 Tecnologias Utilizadas

- **[React](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces
- **[Vite](https://vitejs.dev/)** - Build tool rápida e moderna
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[date-fns](https://date-fns.org/)** - Biblioteca para manipulação de datas
- **[Context API](https://react.dev/reference/react/useContext)** - Gerenciamento de estado global
- **[LocalStorage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)** - Persistência de dados

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/guilhermecervi99/MoodApp.git
cd MoodApp
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure o Tailwind CSS** (se ainda não estiver configurado)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
mood-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/
│   │   │   ├── DailyCheckCard.jsx
│   │   │   ├── WeeklyStatusCard.jsx
│   │   │   ├── WeeklySummary.jsx
│   │   │   ├── InsightsSection.jsx
│   │   │   ├── QuickStats.jsx
│   │   │   └── CommunityCard.jsx
│   │   ├── questionnaire/
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── MoodSelector.jsx
│   │   ├── evolution/
│   │   │   ├── MoodChart.jsx
│   │   │   ├── TrendChart.jsx
│   │   │   └── StatsLegend.jsx
│   │   ├── support/
│   │   │   ├── EmergencyCard.jsx
│   │   │   ├── ScheduleCard.jsx
│   │   │   └── ResourcesGrid.jsx
│   │   └── tips/
│   │       └── TipCard.jsx
│   ├── contexts/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useMoodStats.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Questionnaire.jsx
│   │   ├── Evolution.jsx
│   │   ├── Support.jsx
│   │   └── Tips.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   ├── dateHelpers.js
│   │   └── moodHelpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 💻 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Cria a versão de produção
npm run preview      # Visualiza a build de produção

# Linting
npm run lint         # Executa o ESLint
```

## 🎨 Customização

### Cores

As cores podem ser customizadas no arquivo `src/utils/constants.js`:

```javascript
export const COLORS = {
  primary: '#7C3AED',    // Roxo
  secondary: '#EC4899',  // Rosa
  tertiary: '#06B6D4',   // Ciano
  background: '#F8FAFC', // Cinza claro
  // ...
};
```

### Moods (Humores)

Adicione ou modifique os humores disponíveis em `src/utils/constants.js`:

```javascript
export const MOODS = [
  { value: 'feliz', label: 'Feliz', icon: '😄', color: COLORS.secondary },
  // Adicione novos moods aqui
];
```

## 📱 Responsividade

O aplicativo é totalmente responsivo e otimizado para:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

## 🔐 Privacidade e Segurança

- Todos os dados são armazenados **localmente** no navegador
- Nenhuma informação é enviada para servidores externos
- Os dados persistem entre sessões usando LocalStorage
- Para limpar os dados, use as ferramentas do desenvolvedor do navegador

### 📝 Padrões de Código

- Use componentes funcionais com hooks
- Mantenha componentes pequenos e focados
- Use o Context API para estado global
- Siga o padrão de nomenclatura em camelCase
- Documente funções complexas

## 👥 Autor

- **Guilherme Cervi Schwingel** - *Desenvolvimento inicial* - [seu-usuario](https://github.com/seu-usuario)

**Feito com ❤️ para ajudar pessoas a cuidarem melhor de sua saúde mental**

[⬆ Voltar ao topo](#-humor-diário---mood-tracker-app)