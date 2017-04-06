// see walkthrough: https://msdn.microsoft.com/en-us/library/ms182532.aspx
// sample code obtained at: https://msdn.microsoft.com/en-us/library/ms243176.aspx

using System;

namespace BankAccountNS
{
    /// <summary>
    /// Bank Account demo class.   
    /// </summary>   
    public class BankAccount
    {
        private string m_customerName;

        private double m_balance;

        private bool m_frozen = false;

        public const string DebitAmountExceedsBalanceMessage = "Debit amount exceeds balance"; // added: in walkthrough
        public const string DebitAmountLessThanZeroMessage = "Debit amount less than zero"; // added: in walkthrough
        public const string AccountFrozenMessage = "Account Frozen - Unable to perform account credits/debits"; // added: Troy Davis

        private BankAccount()
        {
        }

        public BankAccount(string customerName, double balance)
        {
            m_customerName = customerName;
            m_balance = balance;
        }

        public string CustomerName
        {
            get { return m_customerName; }
        }

        public double Balance
        {
            get { return m_balance; }
        }

        public void Debit(double amount)
        {
            if (m_frozen)
            {
                throw new Exception(AccountFrozenMessage); // modified: Troy Davis
            }

            if (amount > m_balance)
            {
                throw new ArgumentOutOfRangeException("amount", amount, DebitAmountExceedsBalanceMessage); // modified: in walkthrough
            }

            if (amount < 0)
            {
                throw new ArgumentOutOfRangeException("amount", amount, DebitAmountLessThanZeroMessage); // modified: in walkthrough
            }

            m_balance -= amount; // intentionally incorrect code - CORRECTED in walkthrough  
        }

        public void Credit(double amount)
        {
            if (m_frozen)
            {
                throw new Exception(AccountFrozenMessage); // modified: Troy Davis
            }

            if (amount < 0)
            {
                throw new ArgumentOutOfRangeException("amount");
            }

            m_balance += amount;
        }

        private void FreezeAccount()
        {
            m_frozen = true;
        }

        private void UnfreezeAccount()
        {
            m_frozen = false;
        }

        public static void Main()
        {
            BankAccount ba = new BankAccount("Mr. Bryan Walton", 11.99);

            ba.Credit(5.77);
            ba.Debit(11.22);
            Console.WriteLine("Current balance is ${0}", ba.Balance);
        }

    }
}
