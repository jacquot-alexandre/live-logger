using NxtStpHttpClientLib;
using System;
using System.Threading;

namespace Samples
{
    internal static class Example_4
    {
        internal static void Run(bool cloud = false)
        {
            // Example 4
            // performance measurement  using minimum functionalities of the NxtStpHttpPerformanceLogBase base class.
            var httpPerformanceBase = new NxtStpHttpPerformanceLogBase();
            httpPerformanceBase.BeginLog(1);
            // a long runing task
            Thread.Sleep(2024);
            // end
            httpPerformanceBase.EndLog(1, "The execution path description");
            var dict = httpPerformanceBase.MessagesDictionary;
            var log = httpPerformanceBase.DictToJsonString(dict);
            Console.WriteLine(log); // the dictionary contains two kind keys:
                                    // - Execution path # 
                                    // - Path execution duration [s] #. 
                                    // These two set of keys translates into two columns. The first column provide a description of the path 1 and the second column provide the execution duration of this path.
            var http = new NxtStpHttpClient() { Cloud = cloud };
            http.EndPointPost(log);
        }
    }
}
