using NxtStpHttpClientLib;
using System;

namespace Samples
{
    internal static class Example_2
    {
        internal static void Run()
        {
            // Example 2
            var http = new NxtStpHttpClient("http://127.0.0.1:3000", "logText", "text/plain");
            var textPayLoad = "Hello world!";
            http.EndPointPost(textPayLoad);
            Console.WriteLine(textPayLoad);
        }
    }
}
