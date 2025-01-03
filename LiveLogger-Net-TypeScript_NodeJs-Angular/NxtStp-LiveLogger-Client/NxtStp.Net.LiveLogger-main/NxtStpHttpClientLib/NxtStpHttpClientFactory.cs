using System.Diagnostics;

namespace NxtStpHttpClientLib
{
    /// <summary>
    /// Lazy factory for NxtStpHttpClientsContainer/>
    /// </summary>
    /// <typeparam name="TInstanceIndexType"></typeparam>
    public sealed class NxtStpHttpClientFactory<TInstanceIndexType>
    {
        #region Constructors

        private NxtStpHttpClientFactory()
        {
            // declared the default as private hide it effectively. 
        }

        #endregion Constructors

        #region Factories

        /// <summary>
        /// Lazy factory of NxtStpHttpClientsContainer/>
        /// </summary>
        /// <param name="nxtStepHttpClientsContainer"></param>
        /// <returns>return an instance of NxtStpHttpClientsContainer </returns>
        public static NxtStpHttpClientsContainer<TInstanceIndexType> Lazy(ref NxtStpHttpClientsContainer<TInstanceIndexType> nxtStepHttpClientsContainer)
        {
            if (nxtStepHttpClientsContainer != null)
            {
                return nxtStepHttpClientsContainer;
            }
            nxtStepHttpClientsContainer = new NxtStpHttpClientsContainer<TInstanceIndexType>();
            return nxtStepHttpClientsContainer;
        }

        /// <summary>
        /// Lazy factory that include metrics about container and httpClient instance creation.
        /// </summary>
        /// <param name="nxtStpHttpClientsContainer"></param>
        /// <param name="contextInfo0"></param>
        /// <param name="contextInfo1"></param>
        /// <returns>return and instance of NxtStpHttpClientsContainer</returns>
        public static NxtStpHttpClientsContainer<TInstanceIndexType> Lazy(
            ref NxtStpHttpClientsContainer<TInstanceIndexType> nxtStpHttpClientsContainer,
            string contextInfo0,
            string contextInfo1)
        {
            if (nxtStpHttpClientsContainer != null)
            {
                return nxtStpHttpClientsContainer;
            }
            var performanceStopWatch = new Stopwatch();
            performanceStopWatch.Start();
            var startTime = performanceStopWatch.ElapsedTicks / (Stopwatch.Frequency / (1000L * 1000L));
            var metrics = new NxtStpHttpClientMetrics(performanceStopWatch)
            {
                ContextInfo0 = contextInfo0,
                ContextInfo1 = contextInfo1,
                M3 = startTime
            };
            nxtStpHttpClientsContainer = new NxtStpHttpClientsContainer<TInstanceIndexType>(metrics);
            metrics.M4 = performanceStopWatch.ElapsedTicks / (Stopwatch.Frequency / (1000L * 1000L));
            metrics.Result2 = metrics.MicroSecondsToSeconds(metrics.M4 - metrics.M3);
            return nxtStpHttpClientsContainer;
        }

        #endregion factories

    }
}
