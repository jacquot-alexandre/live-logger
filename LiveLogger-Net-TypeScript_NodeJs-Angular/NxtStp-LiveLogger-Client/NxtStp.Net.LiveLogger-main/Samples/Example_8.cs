using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Samples
{
    internal static class Example_8
    {
        private const int workItemNumber = 100;

        private const int maximunDurationOfWorkItemExecution = 100; //milliseconds

        private static readonly object ConsoleLock = new object();

        internal static async Task RunAsync()
        {
            // Example 8
            // exemple of tasks run in parallels

            await CreateAndExecuteThreads();
        }

        private static async Task CreateAndExecuteThreads()
        {
            // Create a list of 10 work items
            var workItemIndexes = Enumerable.Range(1, workItemNumber).ToList();

            // Use Parallel.ForEach to create and run tasks
            await Task.WhenAll(workItemIndexes.Select(itemIndex => PerformTaskAsync(itemIndex)));
        }

        private static async Task PerformTaskAsync(int itemIndex)
        {
            // Create a random number generator
            Random random = new Random();

            // Generate a random number of milliseconds (less than 1000 ms)
            int delay = random.Next(maximunDurationOfWorkItemExecution);

            // Wait for the random number of milliseconds
            await Task.Delay(delay);

            // Log the item, delay, and thread ID
            lock (ConsoleLock)
            {
                Console.WriteLine($"Item index: {itemIndex}, Delay: {delay} ms, Thread ID: {Thread.CurrentThread.ManagedThreadId}");
            }
        }
    }
}
