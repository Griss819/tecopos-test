import axios from "axios";

export type BankAccountDto = {
  id: number;
  name: string;
  createdAt: Date;
  amount: number;
}
export type BankTransactionDto = {
  id: number;
  amount: number;
  createdAt: Date;
  bankAccountId: number;
  name: string;
  type: 'withdraw' | 'deposit';
}

export const api = axios.create({
  baseURL: "https://693b21fa9b80ba7262cc858e.mockapi.io/api/v1/",
  timeout: 8000,
});

export default {
  getBankAccounts: async () => {
    try {
      const response = await api.get('bankAccount');
      const bankAccounts: BankAccountDto[] = response.data;
      return bankAccounts;
    }
    catch (error) {
      console.error(error);
    }
  },
  getBankTransactions: async () => {
    try {
      const response = await api.get('bankTransaction');
      const bankTransactions: BankTransactionDto[] = response.data;
      console.log(bankTransactions);
      return bankTransactions;
    }
    catch (error) {
      console.error(error);
    }
  },
  addBankTransaction: async (transaction: BankTransactionDto) => {
    try {
      const response = await api.post('bankTransaction', transaction);
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  },
  deleteBankTransaction: async (id: number) => {
    try {
      const response = await api.delete(`bankTransaction/${id}`);
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }
}
