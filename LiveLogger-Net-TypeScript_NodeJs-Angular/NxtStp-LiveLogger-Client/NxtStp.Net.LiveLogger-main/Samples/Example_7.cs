
using NxtStpHttpClientLib;
using System.Threading;
using System;

namespace Samples
{
    internal static class Example_7
    {
        public class NotebookSpecficObject
        {
            public string Info => "Notebook specific information";
        }

        public class NxtStpHttpPerformanceNotebookLog : NxtStpHttpPerformanceLog
        {
            /// <summary>
            /// 
            /// </summary>
            public override void BeginLog(params object[] objects)
            {
                base.BeginLog(objects); // log starting time, and store it to M0
                this.MessagesDictionary.Add("Notebook", ((NotebookSpecficObject)objects[0]).Info);
            }
        }

        internal static void Run()
        {
            // Example 7

            // Example that illustrate the instantiation of a class derived from NxtStpHttpPerformanceLogBase using the a factoring. This class encapsulate a NxtStpHttpClient and 
            // also takes a interface that is specific to the host as paramter in the BeginLog method so that information of thtat class can be logged.

            var notebook = new NotebookSpecficObject();

            NxtStpHttpClientsContainer<int> httpClientsContainer = null;
            Console.WriteLine($"Thread # {Thread.CurrentThread.ManagedThreadId}");
            var nxtStpHttpPerformanceNotebookLog = NxtStpHttpClientFactory<int>.Lazy(ref httpClientsContainer).GetHttp<NxtStpHttpPerformanceNotebookLog>(Thread.CurrentThread.ManagedThreadId);

            nxtStpHttpPerformanceNotebookLog.BeginLog(notebook);
            Thread.Sleep(1000);
            nxtStpHttpPerformanceNotebookLog.EndLog();
        }
    }
}
