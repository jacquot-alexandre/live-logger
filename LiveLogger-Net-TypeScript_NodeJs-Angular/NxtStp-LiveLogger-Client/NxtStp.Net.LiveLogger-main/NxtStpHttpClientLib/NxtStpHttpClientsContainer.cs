using System.Collections.Concurrent;
using System.Collections.Generic;

namespace NxtStpHttpClientLib
{
    /// <inheritdoc cref="INxtStpHttpClientsContainer{T}"/>
    public class NxtStpHttpClientsContainer<TInstanceIndexType>
    {
        #region private Fields and Constant

        private readonly ConcurrentDictionary<TInstanceIndexType, INxtStpHttpClient> httpsContainer = new ConcurrentDictionary<TInstanceIndexType, INxtStpHttpClient>();

        private readonly NxtStpHttpClientMetrics metrics;

        #endregion private Fields and Constants

        #region Constructor

        public NxtStpHttpClientsContainer(NxtStpHttpClientMetrics metrics) : this()
        {
            this.metrics = metrics;
        }

        /// <summary>
        /// The constructor.
        /// </summary>
        public NxtStpHttpClientsContainer()
        {
           //
        }

        #endregion Constructor

        #region public Methods

        /// <inherrit cref="INxtStpHttpClientsContainer{T}.GetHttp{T}"/>
        public TLogType GetHttp<TLogType>(TInstanceIndexType instanceIndex) where TLogType : INxtStpHttpClient, new()
        {
            if (this.metrics != null)
            {
                this.metrics.M0 = metrics?.PerformanceStopWatchElapsed();
            }
            if (httpsContainer.TryGetValue(instanceIndex, out var http))
            {
                this.FillMetrics("cache", instanceIndex);
                return (TLogType)http;
            }

            var newHttp = new TLogType();
            newHttp.Metrics = this.metrics;
            httpsContainer.TryAdd(instanceIndex, newHttp);
            this.FillMetrics("new instance", instanceIndex);
            return newHttp;
        }

        #endregion public methods

        #region private Methods

        private void FillMetrics(string obtainingMethod, TInstanceIndexType instanceIndex)
        {
            if (metrics == null)
            {
                return;
            }

            this.metrics.ObtainingMethod = obtainingMethod;
            this.metrics.M1 = metrics.PerformanceStopWatchElapsed();
            this.metrics.Result1 = this.metrics.MicroSecondsToSeconds(this.metrics.M1 - this.metrics.M0);
            this.SetMetricsAsDictionary(instanceIndex);
        }

        private void SetMetricsAsDictionary(TInstanceIndexType instanceIndex)
        {
            this.metrics.MetricsDictionary =
                new Dictionary<string, string>()
                {
                    { "Logger created in", this.metrics.ContextInfo0 },
                    { "Id of the instance containing the logger", metrics.ContextInfo1 },
                    { "logger Id", instanceIndex.ToString() },
                    { "logger obtaining method", this.metrics.ObtainingMethod },
                    { "logger instantiation execution time [s]", this.metrics.Result1 },
                    { " NxtStpHttpClientsContainer instantiation duration", this.metrics.Result2 }
                };
        }

        #endregion private Methods
    }
}
