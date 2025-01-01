using System.Linq;
using System.Threading;
using System;
using System.Threading.Tasks;
using NxtStpHttpClientLib;

namespace Samples
{
    /// <summary>
    /// Performance log for tasks run in parallele using await / async
    /// </summary>
    internal class Example_9
    {
        private const int workItemNumber = 100;

        private const int maximunDurationOfWorkItemExecution = 100; //milliseconds

        private static readonly object LockHttpFactory = new object();

        private static readonly object ConsoleLock = new object();

        private NotebookSpecficObject notebook = new NotebookSpecficObject();

        private NxtStpHttpClientsContainer<int> httpClientsContainer = null;

        internal async Task RunAsync()
        {
            // Example 9
            // exemple of tasks run in parallele for which we would like to measure for each the execution time   

            await CreateAndExecuteThreads();
        }

        private async Task CreateAndExecuteThreads()
        {
            // Create a list of 10 work items
            var workItemIndexes = Enumerable.Range(1, workItemNumber).ToList();

            // Use Parallel.ForEach to create and run tasks
            await Task.WhenAll(workItemIndexes.Select(itemIndex => PerformTaskAsync(itemIndex)));
        }

        private async Task PerformTaskAsync(int workItemIndex)
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

            // Wait for the random number of milliseconds
            await Task.Delay(delay);
                
            lock (LockHttpFactory)
            {
                NxtStpHttpClientFactory<int>.Lazy(ref httpClientsContainer).GetHttp<NxtStpHttpPerformanceNotebookLog>(workItemIndex).EndLog(Thread.CurrentThread.ManagedThreadId);
            }

            // Log the item, delay, and thread ID
            lock (ConsoleLock)
            {
                Console.WriteLine($"Work item index: {workItemIndex}, Delay: {delay} ms, Thread ID: {Thread.CurrentThread.ManagedThreadId}");
            }
        }
    }
}
