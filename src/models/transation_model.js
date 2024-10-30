/* _id: ObjectId,                    // Identificador único da transação
  walletFrom: ObjectId,             // Carteira de origem (nulo para depósitos)
  walletTo: ObjectId,               // Carteira de destino (nulo para saques)
  amount: Number,                   // Valor da transação (positivo para depósitos, negativo para saques)
  type: String,                     // Tipo de transação (e.g., "transfer", "deposit", "withdraw")
  status: String,                   // Status da transação (e.g., "completed", "pending", "failed")
  createdAt: Date,                  // Data da transação
  currency: String,                 // Tipo de moeda envolvida
  details: String   */