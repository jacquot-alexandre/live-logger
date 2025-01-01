using NxtStpHttpClientLib;
using System;
using System.Threading;

namespace Samples
{
    internal static class Example_5
    {
        enum Paths
        {
            path1,
            path2,
            path3
        }

        internal static void Run()
        {
            var httpPerformanceBase = new NxtStpHttpPerformanceLogBase();
            var path = Paths.path2;
            httpPerformanceBase.BeginLog(1, 2, 3); // start time for path 1, 2 and 3 are same and measured at this point.
            switch (path)
            { // one path is executed
                case Paths.path1:
                    Thread.Sleep(1000);
                    httpPerformanceBase.EndLog(1, "Path 1 executed");
                    httpPerformanceBase.EndLog(2, 3); // set path 2 and 3 as not executed
                    break;
                case Paths.path2:
                    Thread.Sleep(2000);
                    httpPerformanceBase.EndLog(2, "Path 2 executed");
                    httpPerformanceBase.EndLog(1, 3); // set path 1 and 3 as not executed
                    break;
                case Paths.path3:
                    Thread.Sleep(3000);
                    httpPerformanceBase.EndLog(3, "Path 3 executed");
                    httpPerformanceBase.EndLog(1, 2); // set path 1 and 2 as not executed
                    break;
            }
            httpPerformanceBase.EndLog();
            var dict = httpPerformanceBase.MessagesDictionary;
            var log = httpPerformanceBase.DictToJsonString(dict);
            Console.WriteLine(log); // the dictionary contains two kind keys:
                                    // - Execution path # 
                                    // - Path execution duration [s] #. 
                                    // These two set of keys translates into two columns. The first column provide a description of the path 1 and the second column provide the execution duration of this path.
            var http = new NxtStpHttpClient();
            http.EndPointPost(log);
        }
    }
}
