/*
 *  Author: Troy Davis
 *  Project: Module10 - BankAccount - Console
 *      
 *      Explores Unit testing as outlined in the following walkthrough article:
 *          https://msdn.microsoft.com/en-us/library/ms182532.aspx
 *          
 *      See my "Unit Test Example" below
 *          
 *  Class: IN 2017 (Advanced C#)
 *  Date: Apr 05, 2017 
 *  Revision: Original
 */
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BankAccountNS;

namespace BankTests
{
    [TestClass]
    public class BankAccountTests
    {

        [TestMethod]
        public void Debit_WithValidAmount_UpdatesBalance()
        {
            // arrange  
            double beginningBalance = 11.99;
            double debitAmount = 4.55;
            double expected = 7.44;
            BankAccount account = new BankAccount("Mr. Bryan Walton", beginningBalance);

            // act  
            account.Debit(debitAmount);

            // assert  
            double actual = account.Balance;
            Assert.AreEqual(expected, actual, 0.001, "Account not debited correctly");
        }

        [TestMethod]
        public void Debit_WhenAmountIsLessThanZero_ShouldThrowArgumentOutOfRange()
        {
            // arrange  
            double beginningBalance = 11.99;
            double debitAmount = -0.01;
            BankAccount account = new BankAccount("Mr. Bryan Walton", beginningBalance);

            // act
            try
            {
                account.Debit(debitAmount);
            }
            catch (ArgumentOutOfRangeException e)
            {
                // assert  
                StringAssert.Contains(e.Message, BankAccount.DebitAmountLessThanZeroMessage);
                return;
            }
            Assert.Fail("No exception was thrown.");
        }

        [TestMethod]
        public void Debit_WhenAmountIsMoreThanBalance_ShouldThrowArgumentOutOfRange()
        {
            // arrange  
            double beginningBalance = 11.99;
            double debitAmount = 12.00;
            BankAccount account = new BankAccount("Mr. Bryan Walton", beginningBalance);

            // act  
            try
            {
                account.Debit(debitAmount);
            }
            catch (ArgumentOutOfRangeException e)
            {
                // assert  
                StringAssert.Contains(e.Message, BankAccount.DebitAmountExceedsBalanceMessage);
                return;
            }
            Assert.Fail("No exception was thrown.");
        }

        // Unit Test Example
        //
        // Notes:
        //     The PrivateObject class allows unit testing of code that would not normally be accessible
        //     due to its private nature. I used this class to create the privateAccessor object which in
        //     turn is used to invoke the private BankAccount method FreezeAccount(). After freezing the
        //     account an attempt is made to Debit() the account. This action throws an Exception with the
        //     message equal to the string BankAccount.AccountFrozenMessage. In effect we are really testing
        //     three things here, that FreezeAccount() works (sets m_frozen = true), that Debit() doesn't
        //     work when the account is frozen (Exception thrown), and that the Exception thrown by Debit()
        //     is the correct account frozen message. A similar unit test named
        //     Credit_WhenAccountFrozen_ShouldThrowException could be created.

        //     For more on PrivateObject, see the following:
        //          https://msdn.microsoft.com/en-us/library/system.exception.exception(v=vs.110).aspx
        //          https://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.unittesting.privateobject.aspx
        //          http://stackoverflow.com/questions/9122708/unit-testing-private-methods-in-c-sharp
        //
        [TestMethod]
        public void Debit_WhenAccountFrozen_ShouldThrowException()
        {
            // arrange  
            double beginningBalance = 11.99;
            double debitAmount = 5.00;
            BankAccount account = new BankAccount("Mr. Bryan Walton", beginningBalance);
            PrivateObject privateAccessor = new PrivateObject(account);

            // act  
            try
            {
                privateAccessor.Invoke("FreezeAccount");
                account.Debit(debitAmount);
            }
            catch (Exception e)
            {
                // assert  
                StringAssert.Contains(e.Message, BankAccount.AccountFrozenMessage);
                return;
            }
            Assert.Fail("No exception was thrown.");
        }

        // next test here
    }
}
