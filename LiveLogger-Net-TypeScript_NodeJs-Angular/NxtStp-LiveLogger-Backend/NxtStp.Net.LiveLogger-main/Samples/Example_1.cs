using NxtStpHttpClientLib;
using System;
using System.Text.Json;
namespace Samples
{
    internal static class Example_1
    {
        public class JsonPayLoad
        {
            public string Label { get; set; }
            public string Value1 { get; set; }
            public string Value2 { get; set; }
        }


        internal static void Run()
        {
            //Example 1
            var payloadObject = new JsonPayLoad()
            {
                Label = "Test2",
                Value1 = "1.0",
                Value2 = "1.0"
            };
            var http = new NxtStpHttpClient();
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonPayLoad = JsonSerializer.Serialize(payloadObject, options);
            http.EndPointPost(jsonPayLoad);
            Console.WriteLine(jsonPayLoad);
        }
    }
}
