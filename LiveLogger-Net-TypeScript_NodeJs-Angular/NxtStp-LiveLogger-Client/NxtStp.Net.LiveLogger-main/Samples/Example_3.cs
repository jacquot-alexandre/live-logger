using NxtStpHttpClientLib;
using System;
using System.Diagnostics;
using System.Threading;

namespace Samples
{
    internal static class Example_3
    {
        internal static void Run(bool cloud = false)
        {
            // Example 3
            // performance measurement using low level API
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            var http = new NxtStpHttpClient("127.0.0.1", "logText", "text/plain") { Cloud = cloud };
            http.Metrics = new NxtStpHttpClientMetrics(stopWatch);
            var metrics = http.Metrics;
            metrics.M0 = http.Metrics.PerformanceStopWatchElapsed();
            // a long runing task
            Thread.Sleep(2024);
            // end
            metrics.M1 = http.Metrics.PerformanceStopWatchElapsed();
            var metric1 = metrics.MicroSecondsToSeconds(metrics.M1 - metrics.M0);
            Console.WriteLine(metrics.MicroSecondsToSeconds(metrics.M1 - metrics.M0));
            var log = $"Metric low level API: {metric1}";
            Console.WriteLine(log);
            http.EndPointPost(log);
        }
    }
}
