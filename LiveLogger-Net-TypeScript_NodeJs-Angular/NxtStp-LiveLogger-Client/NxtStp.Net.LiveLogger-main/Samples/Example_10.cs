using NxtStpHttpClientLib;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Samples
{
    internal class Example_10
    {
        private const int workItemNumber = 100;

        private const int maximunDurationOfWorkItemExecution = 100; //milliseconds

        private static readonly object LockHttpFactory = new object();

        private static readonly object ConsoleLock = new object();

        private NotebookSpecficObject notebook = new NotebookSpecficObject();

        private NxtStpHttpClientsContainer<int> httpClientsContainer = null;

        internal void Run()
        {
            var workItemIndexes = Enumerable.Range(1, workItemNumber).ToList();
            Parallel.ForEach(workItemIndexes, workItemIndex =>
            {
                ExecuteMethod(workItemIndex);
            });
        }

        void ExecuteMethod(int workItemIndex)
        {
            int delay;
            lock (LockHttpFactory)
            {
                // Create a random number generator
                Random random = new Random();
                // Generate a random number of milliseconds (less than 1000 ms) 
                delay = random.Next(maximunDurationOfWorkItemExecution);
                notebook.ItemIndex = workItemIndex;
                notebook.Delay = delay;
                notebook.ThreadId = Thread.CurrentThread.ManagedThreadId;
                NxtStpHttpClientFactory<int>.Lazy(ref httpClientsContainer).GetHttp<NxtStpHttpPerformanceNotebookLog>(workItemIndex).BeginLog(notebook);
            }

            Thread.Sleep(delay);

            lock (LockHttpFactory)
            {
                NxtStpHttpClientFactory<int>.Lazy(ref httpClientsContainer).GetHttp<NxtStpHttpPerformanceNotebookLog>(workItemIndex).EndLog(Thread.CurrentThread.ManagedThreadId);
            }

            lock (ConsoleLock)
            {
                Console.WriteLine($"Work item index: {workItemIndex}, Delay: {delay} ms, Thread Id: {Thread.CurrentThread.ManagedThreadId}");
            }
        }
    }
}
