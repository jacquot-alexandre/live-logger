
using NxtStpHttpClientLib;
using System.Threading;
using System;

namespace Samples
{
    internal static class Example_6
    {
        internal static void Run(bool cloud = false)
        {
            // Example 6
            // Example that illustrate the use of HttpClientFactory to create an instance of NxtStpHttpClientsContainer and log the time it take to create those instances

            NxtStpHttpClientsContainer<int> httpClientsContainer = null;
            Console.WriteLine($"Thread # {Thread.CurrentThread.ManagedThreadId}");
            var nxtStpHttpPerformanceLogBase = NxtStpHttpClientFactory<int>.Lazy(ref httpClientsContainer, null, "Polyglot notebook context").GetHttp<NxtStpHttpPerformanceLogBase>(Thread.CurrentThread.ManagedThreadId);
            nxtStpHttpPerformanceLogBase.BeginLog(1);
            Thread.Sleep(1000);
            nxtStpHttpPerformanceLogBase.EndLog(1, "path 1");
            var dict = nxtStpHttpPerformanceLogBase.MessagesDictionary;
            var log = nxtStpHttpPerformanceLogBase.DictToJsonString(dict);
            Console.WriteLine(log); // the dictionary contains two kind keys:
                                    // - Execution path # 
                                    // - Path execution duration [s] #. 
                                    // These two set of keys translates into two columns. The first column provide a description of the path 1 and the second column provide the execution duration of this path.
            var http = new NxtStpHttpClient() { Cloud = cloud };

            // log information about execution path 1
            http.EndPointPost(log);

            //Log metrics about container and nxtStpHttpPerformanceLogBase creation.
            var metricsDictionary = nxtStpHttpPerformanceLogBase.Metrics.MetricsDictionary;
            log = nxtStpHttpPerformanceLogBase.DictToJsonString(metricsDictionary);
            Console.WriteLine(log);
            http.EndPointPost(log);
        }
    }
}
