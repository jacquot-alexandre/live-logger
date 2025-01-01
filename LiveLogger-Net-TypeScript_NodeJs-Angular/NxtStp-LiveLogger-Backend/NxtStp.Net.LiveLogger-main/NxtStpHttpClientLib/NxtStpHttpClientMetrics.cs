using System.Collections.Generic;
using System.Diagnostics;

namespace NxtStpHttpClientLib
{
    public class NxtStpHttpClientMetrics
    {
        #region private Fields

        private readonly Stopwatch performanceStopWatch;

        #endregion private Fields

        #region Constructor

        public NxtStpHttpClientMetrics(Stopwatch performanceStopWatch)
        {
            this.performanceStopWatch = performanceStopWatch;
        }

        #endregion Constructors

        #region public Properties

        public long? M0 { get; set; }

        public long? M1 { get; set; }

        public long? M3 { get; set; }

        public long? M4 { get; set; }

        public string ContextInfo0 { get; set; }

        public string ContextInfo1 { get; set; }

        public string ObtainingMethod { get; set; }

        public string Result1 { get; set; }

        public string Result2 { get; set; }

        public Dictionary<string, string> MetricsDictionary { get; set; }

        #endregion public properties

        #region public Methods

        public string MicroSecondsToSeconds(long? microSeconds)
        {
            if (microSeconds == null)
            {
                return "Null";
            }

            var seconds = (double)microSeconds / 1e6;
            return $"{seconds:0.######}";
        }

        /// <summary>
        /// Performance stop watch.
        /// </summary>
        /// <returns>in micro seconds</returns>
        public long PerformanceStopWatchElapsed()
        {
            return performanceStopWatch.ElapsedTicks / (Stopwatch.Frequency / (1000L * 1000L));
        }

        /// <summary>
        /// Merge two dictionaries.
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="dictionaries"></param>
        /// <returns>the merged dictionary</returns>
        public Dictionary<TKey, TValue> MergeDictionaries<TKey, TValue>(
            params Dictionary<TKey, TValue>[] dictionaries)
        {
            var mergedDictionary = new Dictionary<TKey, TValue>();
            foreach (var dictionary in dictionaries)
            {
                foreach (var kvp in dictionary)
                {
                    if (!mergedDictionary.ContainsKey(kvp.Key))
                    {
                        mergedDictionary[kvp.Key] = kvp.Value;
                    }
                }
            }
            return mergedDictionary;
        }

        #endregion public Methods
    }
}