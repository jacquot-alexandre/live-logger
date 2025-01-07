using NxtStpHttpClientLib;
using System;

namespace Samples
{
    internal static class Example_2
    {
        internal static void Run(bool cloud = false)
        {
            // Example 2
            var http = new NxtStpHttpClient("127.0.0.1", "logText", "text/plain") { Cloud = cloud };
            var textPayLoad = "Hello world!";
            http.EndPointPost(textPayLoad);
            Console.WriteLine(textPayLoad);
        }
    }
}
