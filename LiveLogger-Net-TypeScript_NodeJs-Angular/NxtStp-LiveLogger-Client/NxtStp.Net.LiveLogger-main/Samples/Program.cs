using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Samples
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            switch (args[0])
            {
                case ("Example1"):
                    Example_1.Run();
                    break;
                case ("Example2"):
                    Example_2.Run();
                    break;
                case ("Example3"):
                    Example_3.Run();
                    break;
                case ("Example4"):
                    Example_4.Run();
                    break;
                case ("Example5"):
                    Example_5.Run();
                    break;
                case ("Example6"):
                    Example_6.Run();
                    break;
                case ("Example7"):
                    Example_7.Run();
                    break;
                case ("Example8"):
                    await Example_8.RunAsync();
                    break;
                case ("Example9"):
                    var example_9 = new Example_9();
                    Stopwatch stopwatch = new Stopwatch();
                    stopwatch.Start();
                    await example_9.RunAsync();
                    stopwatch.Stop();
                    TimeSpan ts = stopwatch.Elapsed;
                    LogEnlapsedTimeInConsole(ts);
                    break;
                case ("Example10"):
                    Stopwatch stopwatch2 = new Stopwatch();
                    var example_10 = new Example_10();
                    stopwatch2.Start();
                    example_10.Run();
                    stopwatch2.Stop();
                    TimeSpan ts2 = stopwatch2.Elapsed;
                    LogEnlapsedTimeInConsole(ts2);
                    break;
                default:
                    break;
            }
            Console.WriteLine("Press a Enter...");
            Console.ReadLine();
        }

        private static void LogEnlapsedTimeInConsole(TimeSpan ts)
        {
            Console.WriteLine("Elapsed Time: {0:00}:{1:00}:{2:00}.{3:00}", ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds / 10);
        }
    }
}
