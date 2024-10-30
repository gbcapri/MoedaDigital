# MoedaDigital
O desafio consiste em construir uma API REST em Node.js que implemente funcionalidades essenciais para uma moeda eletrônica. As funcionalidades incluem:
Cadastro de Usuário (Sign Up): Permitir que novos usuários se registrem, criando suas contas e carteiras digitais.
Autenticação de Usuário (Login): Gerar um token JWT para os usuários logados.
Consulta de Saldo: Um endpoint protegido que permita a consulta do saldo de uma carteira digital.
Transferência de Moeda: Implementar a transferência de moedas entre usuários, garantindo validações adequadas (e.g., saldo suficiente).
Histórico de Transações: Listar as transações realizadas pelo usuário.
Depósito de Moeda (Opcional): Adicionar saldo à conta por meio de um administrador ou serviço de pagamento.
Conversão de Moeda (Opcional): Permitir conversão entre diferentes moedas ou tokens.
Encerramento de Conta: Função para o usuário encerrar sua conta e sacar seus fundos.

Objetivo: Criar um MVP funcional com foco em cadastro, consulta de saldo e transferência de valores.

Sugestão de Estrutura de Dados

Usuários
{
  _id: ObjectId,                    // Identificador único do usuário
  name: String,                     // Nome do usuário
  email: String,                    // Email único para autenticação
  password: String,                 // Senha criptografada
  createdAt: Date,                  // Data de criação do usuário
  walletId: ObjectId,               // Referência à carteira do usuário
  role: String,                     // Permissões do usuário (e.g., "user" ou "admin")
  isActive: Boolean                 // Status da conta do usuário
}

Carteiras
{
  _id: ObjectId,                    // Identificador único da carteira
  userId: ObjectId,                 // Referência ao usuário proprietário da carteira
  balance: Number,                  // Saldo atual da carteira
  currency: String,                 // Tipo de moeda (e.g., "USD", "BRL", "BTC")
  createdAt: Date                   // Data de criação da carteira
}

Transações
{
  _id: ObjectId,                    // Identificador único da transação
  walletFrom: ObjectId,             // Carteira de origem (nulo para depósitos)
  walletTo: ObjectId,               // Carteira de destino (nulo para saques)
  amount: Number,                   // Valor da transação (positivo para depósitos, negativo para saques)
  type: String,                     // Tipo de transação (e.g., "transfer", "deposit", "withdraw")
  status: String,                   // Status da transação (e.g., "completed", "pending", "failed")
  createdAt: Date,                  // Data da transação
  currency: String,                 // Tipo de moeda envolvida
  details: String                   // Detalhes opcionais sobre a transação
}
