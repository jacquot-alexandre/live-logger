using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Base class for  NxtStpHttpPerformanceLog implemented in client application and not in this library.
    /// Provide basics reusable functionality related to execution duration measurement.
    /// </summary>
    public class NxtStpHttpPerformanceLogBase : NxtStpHttpClient
    {
        #region private or  protected Fields and Constants

        private readonly Dictionary<int, string> memExecutionPath;

        private const string ExecutionPath = "Execution path";

        private const string ExecutionPathExecutionDuration = "Path execution duration [s]";

        private const string ExecutionPathNotExecuted = "Execution path not executed";

        private readonly Stopwatch performanceStopWatch;

        #endregion private or protected Constants

        #region Constructors

        public NxtStpHttpPerformanceLogBase()
        { 
           this.MessagesDictionary = new Dictionary<string, string>(); 
           this.memExecutionPath = new Dictionary<int, string>();
           this.performanceStopWatch = new Stopwatch();
           this.performanceStopWatch.Start();
        }

        #endregion Constructors

        #region public Properties

        /// <summary>
        /// Contains result of performance measurement.
        /// </summary>
        public Dictionary<string, string> MessagesDictionary { get; }

        /// <summary>
        /// A field to hold typically a time stamp that will be used to calculate a execution duration.
        /// </summary>
        public string M0 { get; set; }

        /// <summary>
        /// A field to hold typically a time stamp that will be used to calculate a execution duration.
        /// </summary>
        public string M1 { get; set; }

        /// <summary>
        /// A field to hold typically a time stamp that will be used to calculate a execution duration.
        /// </summary>
        public string M2 { get; set; }

        /// <summary>
        /// A field to hold typically a time stamp that will be used to calculate a execution duration.
        /// </summary>
        public string M3 { get; set; }

        #endregion public Properties

        #region public Methods

        /// <summary>
        /// Used to measure execution duration of specific execution path.
        /// </summary>
        /// <param name="pathIndex"></param>
        public virtual void BeginLog(int pathIndex)
        {
            this.memExecutionPath.Add(pathIndex, this.PerformanceStopWatchElapsed());
        }

        public virtual void BeginLog(params int[] pathIndexes)
        {
            foreach (var key in pathIndexes)
            {
                this.memExecutionPath.Add(key, this.PerformanceStopWatchElapsed());
            }
        }

        /// <summary>
        /// Used to measure execution duration of specific execution path.
        /// </summary>
        /// <param name="pathIndex">a key enabling to identifying time stamp of a specific execution path</param>
        /// <param name="description">a text for identifying an execution path</param>
        public virtual void EndLog(int pathIndex, string description)
        {
            if (description == "")
            {
                this.memExecutionPath.Remove(pathIndex);
                AddExecutionPathIsNotExecutedToMessages(pathIndex);
                return;
            }
            this.memExecutionPath.TryGetValue(pathIndex, out string startTime);
            this.MessagesDictionary.Add(ExecutionPath+" "+pathIndex.ToString(), description);
            this.MessagesDictionary.Add(ExecutionPathExecutionDuration+" "+pathIndex, this.MicroSecondsToSeconds(this.Diff(startTime, this.PerformanceStopWatchElapsed())));
            this.memExecutionPath.Remove(pathIndex);
        }

        /// <summary>
        /// Remove keys that no more needed.
        /// </summary>
        /// <param name="pathIndexes"></param>
        public virtual void EndLog(params int[] pathIndexes)
        {
            foreach (var key in pathIndexes)
            {
                this.memExecutionPath.Remove(key);
                AddExecutionPathIsNotExecutedToMessages(key);
            }
        }

        /// <summary>
        /// Convert micro seconds string to second string
        /// </summary>
        /// <param name="microSeconds"></param>
        /// <returns>result as string</returns>
        public string MicroSecondsToSeconds(string microSeconds)
        {
            var seconds = (double)long.Parse(microSeconds) / 1e6;
            return $"{seconds:0.######}";
        }

        /// <summary>
        /// assuming start and stop be a long converted to string,
        /// this function part the strings into long,
        /// calculate stop - start and,
        /// convert the result in long and return the result as string
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns>result as string</returns>
        public string Diff(string start, string stop)
        {
            return (long.Parse(stop) - long.Parse(start)).ToString();
        }

        /// <summary>
        /// Start new stopwatch. It means reset and start.
        /// </summary>
        public void StartPerformanceStopWatch()
        {
            this.performanceStopWatch.Reset();
            this.performanceStopWatch.Start();
        }

        /// <summary>
        /// Stop stopwatch
        /// </summary>
        public void StopPerformanceStopWatch()
        {
            this.performanceStopWatch.Stop();
        }

        /// <summary>
        /// Time elapsed between start and stop time of the performance stopwatch. If the stopwatch was never stop, then it is the elapsed  time since the stop watch is alive,
        /// </summary>
        public string PerformanceStopWatchElapsed()
        {
            long microseconds = performanceStopWatch.ElapsedTicks / (Stopwatch.Frequency / (1000L * 1000L));
            return microseconds.ToString();
        }

        /// <summary>
        /// Get current time.
        /// </summary>
        /// <returns>result as string</returns>
        public string GetTime()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff", CultureInfo.CurrentCulture);
        }

        /// <summary>
        /// Convert a dictionary in Json string.
        /// </summary>
        /// <param name="dict"></param>
        /// <returns>dictionary as string</returns>
        public string DictToJsonString(Dictionary<string, string> dict)
        {
            // "{\""+counter+"\":\""+time+"\"}"
            var jsonString = "{\"";
            var last = dict.Last();
            foreach (var item in dict)
            {
                var pair = item.Key + "\":\"" + item.Value;
                if (item.Equals(last))
                {
                    jsonString += pair;
                }
                else
                {
                    jsonString += pair + "\",\"";
                }
            }
            jsonString += "\"}";
            return jsonString;
        }

        #endregion public Mthods

        #region private Methods

        private void AddExecutionPathIsNotExecutedToMessages(int key)
        {
            this.MessagesDictionary.Add(ExecutionPath + " " + key, ExecutionPathNotExecuted);
            this.MessagesDictionary.Add(ExecutionPathExecutionDuration + " " + key, ExecutionPathNotExecuted);
        }

        #endregion private Methods
    }
}
